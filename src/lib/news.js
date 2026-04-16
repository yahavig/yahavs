const RSS_URL = "https://9to5mac.com/feed/";
const REVALIDATE_NEWS = 1800; // 30 minutes

/**
 * Simple RSS item extractor using regex (no xml2js needed)
 */
function extractRssItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];

    const get = (tag) => {
      const m = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i').exec(block);
      return m ? (m[1] || m[2] || "").trim() : "";
    };

    const title = get("title");
    const link = get("link") || get("guid");
    const pubDate = get("pubDate");
    const creator = get("dc:creator");
    const description = get("description");

    // Extract plain text excerpt from description (strip HTML)
    const excerpt = description
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 200);

    // Extract image from description
    const imgMatch = /<img[^>]+src=["']([^"']+)["']/i.exec(description);
    const image = imgMatch ? imgMatch[1] : null;

    // Extract categories
    const catRegex = /<category[^>]*><!?\[?CDATA\[?([^\]<]+)\]?\]?>/gi;
    const categories = [];
    let catMatch;
    while ((catMatch = catRegex.exec(block)) !== null) {
      categories.push(catMatch[1].trim());
    }

    if (title && link) {
      items.push({
        title,
        link: link.replace(/^.*?(https?:\/\/)/, "$1"),
        pubDate,
        author: creator,
        excerpt,
        image,
        categories: categories.slice(0, 3),
      });
    }
  }

  return items;
}

/**
 * Translate text to Hebrew using Google Translate (unofficial, no API key needed)
 */
async function translateToHebrew(text) {
  if (!text || text.length < 3) return text;

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=he&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      next: { revalidate: 86400 }, // cache translations for 24h
    });

    if (!res.ok) return text;

    const data = await res.json();
    // Response format: [[["translated", "original", ...], ...], ...]
    const translated = data[0]
      ?.map((part) => part[0])
      .filter(Boolean)
      .join("") || text;

    return translated;
  } catch {
    return text; // fallback to English on error
  }
}

/**
 * Fetch and parse 9to5Mac RSS feed, translate to Hebrew
 */
export async function getNews(maxItems = 9) {
  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: REVALIDATE_NEWS },
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);

    const xml = await res.text();
    const items = extractRssItems(xml).slice(0, maxItems);

    // Translate titles and excerpts in parallel (batched)
    const translated = await Promise.all(
      items.map(async (item) => {
        const [titleHe, excerptHe] = await Promise.all([
          translateToHebrew(item.title),
          translateToHebrew(item.excerpt),
        ]);
        return { ...item, titleHe, excerptHe };
      })
    );

    return translated;
  } catch (error) {
    console.error("Failed to fetch 9to5Mac RSS:", error);
    return [];
  }
}

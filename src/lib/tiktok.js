import fs from "fs/promises";
import path from "path";

// ISR: revalidate every hour
export const revalidate = 3600;

const CONTENT_FILE = path.join(process.cwd(), "content", "tiktok-videos.json");
const OEMBED_URL = "https://www.tiktok.com/oembed";

/**
 * Fetch oEmbed metadata for a single TikTok video URL.
 * Returns null if the request fails.
 */
async function fetchOEmbed(videoUrl) {
  try {
    const res = await fetch(
      `${OEMBED_URL}?url=${encodeURIComponent(videoUrl)}`,
      {
        next: { revalidate },
        headers: { "User-Agent": "Mozilla/5.0" },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      url: videoUrl,
      title: data.title || "סרטון TikTok",
      thumbnailUrl: data.thumbnail_url || null,
      authorName: data.author_name || "@yahavguetta",
      platform: "tiktok",
    };
  } catch {
    return null;
  }
}

/**
 * Get latest TikTok videos.
 * Reads URLs from content/tiktok-videos.json and enriches each
 * with oEmbed metadata (title, thumbnail) - no API key required.
 *
 * To add a new video: paste its URL into content/tiktok-videos.json → "videos" array.
 */
export async function getLatestTikToks(maxItems = 8) {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf-8");
    const { videos = [] } = JSON.parse(raw);

    if (videos.length === 0) return [];

    const urls = videos.slice(0, maxItems);

    // Fetch oEmbed for all URLs in parallel
    const results = await Promise.all(urls.map(fetchOEmbed));

    // Filter out any failed fetches
    const valid = results.filter(Boolean);
    console.log(`TikTok: loaded ${valid.length} videos via oEmbed`);
    return valid;
  } catch (err) {
    console.warn("TikTok: failed to load videos -", err.message);
    return [];
  }
}

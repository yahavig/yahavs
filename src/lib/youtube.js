import { readFile } from "fs/promises";
import { join } from "path";
import { REVALIDATE_YOUTUBE, YOUTUBE_MAX_RESULTS } from "./constants";

/** Extract YouTube video ID from any YouTube URL format */
function extractVideoId(url) {
  const clean = url.split("?")[0].split("#")[0];
  const short = clean.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  if (short) return short[1];
  const full = url.match(/[?&]v=([A-Za-z0-9_-]+)/);
  return full ? full[1] : null;
}

/** Fetch title via YouTube oEmbed (no API key needed) */
async function fetchOEmbed(videoUrl) {
  const res = await fetch(
    `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`,
    { next: { revalidate: REVALIDATE_YOUTUBE }, headers: { "User-Agent": "Mozilla/5.0" } }
  );
  if (!res.ok) throw new Error(`oEmbed ${res.status}`);
  return res.json();
}

export async function getLatestVideos(maxResults = YOUTUBE_MAX_RESULTS) {
  try {
    const raw = await readFile(join(process.cwd(), "content", "youtube-videos.json"), "utf-8");
    const { videos: urls = [] } = JSON.parse(raw);

    const results = await Promise.all(
      urls.slice(0, maxResults).map(async (url) => {
        const id = extractVideoId(url);
        if (!id) return null;

        const watchUrl  = `https://www.youtube.com/watch?v=${id}`;
        const fallback  = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

        try {
          const o = await fetchOEmbed(watchUrl);
          return {
            id,
            title:     o.title ?? "",
            thumbnail: o.thumbnail_url ?? fallback,
            url:       watchUrl,
            duration:  null,
            publishedAt: null,
          };
        } catch {
          return { id, title: "", thumbnail: fallback, url: watchUrl, duration: null, publishedAt: null };
        }
      })
    );

    return results.filter(Boolean);
  } catch {
    return [];
  }
}

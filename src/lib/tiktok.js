import { readFile } from "fs/promises";
import { join } from "path";

export const revalidate = 3600;

async function fetchOEmbed(videoUrl) {
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`,
      { next: { revalidate }, headers: { "User-Agent": "Mozilla/5.0" } }
    );
    if (!res.ok) return null;
    const d = await res.json();
    return {
      url: videoUrl,
      title: d.title || "סרטון TikTok",
      thumbnailUrl: d.thumbnail_url || null,
      authorName: d.author_name || "@yahavguetta",
      platform: "tiktok",
    };
  } catch {
    return null;
  }
}

export async function getLatestTikToks(maxItems = 8) {
  try {
    const raw = await readFile(join(process.cwd(), "content", "tiktok-videos.json"), "utf-8");
    const { videos = [] } = JSON.parse(raw);
    if (!videos.length) return [];
    const results = await Promise.all(videos.slice(0, maxItems).map(fetchOEmbed));
    return results.filter(Boolean);
  } catch {
    return [];
  }
}

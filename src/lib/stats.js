import { readFile } from "fs/promises";
import { join } from "path";

const REVALIDATE = 3600; // 1 hour

/**
 * Format a large number to a short readable string.
 * 1200000 → "1.2M", 12500 → "12.5K", 999 → "999"
 */
export function formatCount(n) {
  if (typeof n !== "number" || isNaN(n) || n <= 0) return null;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  return String(n);
}

/** Load manually-managed stats from content/social-stats.json */
async function loadStaticStats() {
  try {
    const raw = await readFile(join(process.cwd(), "content", "social-stats.json"), "utf-8");
    return JSON.parse(raw);
  } catch {
    return { youtube: {}, tiktok: {}, instagram: {} };
  }
}

/** Fetch live YouTube channel stats via Data API v3 (requires YOUTUBE_API_KEY + YOUTUBE_CHANNEL_ID) */
async function fetchYouTubeStats() {
  const key       = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!key || !channelId || key === "your_youtube_api_key_here") return null;

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${key}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    const data = await res.json();
    const stats = data?.items?.[0]?.statistics;
    if (!stats) return null;
    return {
      subscribers: parseInt(stats.subscriberCount, 10) || 0,
      views:       parseInt(stats.viewCount, 10)       || 0,
      videos:      parseInt(stats.videoCount, 10)      || 0,
    };
  } catch {
    return null;
  }
}

/**
 * Returns merged social stats.
 * YouTube is live (if API key set), TikTok/Instagram come from the static JSON.
 */
export async function getSocialStats() {
  const [staticStats, liveYT] = await Promise.all([
    loadStaticStats(),
    fetchYouTubeStats(),
  ]);

  return {
    youtube:   liveYT ?? staticStats.youtube   ?? {},
    tiktok:    staticStats.tiktok              ?? {},
    instagram: staticStats.instagram           ?? {},
  };
}

import { readFile } from "fs/promises";
import { join } from "path";
import { REVALIDATE_YOUTUBE, YOUTUBE_MAX_RESULTS } from "./constants";

/** Extract YouTube video ID from any YouTube URL format */
function extractVideoId(url) {
  const clean = url.split("?")[0].split("#")[0];
  // youtu.be/VIDEO_ID
  const short = clean.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  if (short) return short[1];
  // youtube.com/watch?v=VIDEO_ID
  const full = url.match(/[?&]v=([A-Za-z0-9_-]+)/);
  if (full) return full[1];
  return null;
}

/** Fetch title via YouTube oEmbed (no API key needed) */
async function fetchOEmbed(videoUrl) {
  const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
  const res = await fetch(endpoint, {
    next: { revalidate: REVALIDATE_YOUTUBE },
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`oEmbed failed for ${videoUrl}: ${res.status}`);
  return res.json();
}

export async function getLatestVideos(maxResults = YOUTUBE_MAX_RESULTS) {
  try {
    const raw = await readFile(join(process.cwd(), "content", "youtube-videos.json"), "utf-8");
    const { videos: urls = [] } = JSON.parse(raw);

    const results = await Promise.all(
      urls.slice(0, maxResults).map(async (url) => {
        const videoId = extractVideoId(url);
        if (!videoId) return null;

        try {
          const oembed = await fetchOEmbed(`https://www.youtube.com/watch?v=${videoId}`);
          return {
            id:          videoId,
            title:       oembed.title ?? "",
            description: "",
            thumbnail:   oembed.thumbnail_url
                         ?? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            publishedAt: null,
            viewCount:   "0",
            url:         `https://www.youtube.com/watch?v=${videoId}`,
            duration:    null,
          };
        } catch {
          // oEmbed failed - return with just the thumbnail
          return {
            id:          videoId,
            title:       "",
            description: "",
            thumbnail:   `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            publishedAt: null,
            viewCount:   "0",
            url:         `https://www.youtube.com/watch?v=${videoId}`,
            duration:    null,
          };
        }
      })
    );

    const videos = results.filter(Boolean);
    console.log(`YouTube: loaded ${videos.length} videos from JSON`);
    return videos;
  } catch (error) {
    console.error("YouTube fetch failed:", error);
    return [];
  }
}

export async function searchChannelVideos(keyword, maxResults = YOUTUBE_MAX_RESULTS) {
  const all = await getLatestVideos(maxResults);
  if (!keyword) return all;
  const lower = keyword.toLowerCase();
  return all.filter(
    (v) => v.title.toLowerCase().includes(lower) || v.description.toLowerCase().includes(lower)
  );
}

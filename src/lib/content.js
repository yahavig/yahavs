import { readFile } from "fs/promises";
import { join } from "path";

const contentDir = join(process.cwd(), "content");

async function readJson(filename) {
  const raw = await readFile(join(contentDir, filename), "utf-8");
  return JSON.parse(raw);
}

export function getSiteConfig() {
  return readJson("site.json");
}

export function getHeroContent() {
  return readJson("hero.json");
}

export function getAboutContent() {
  return readJson("about.json");
}

export async function getCategories() {
  const data = await readJson("categories.json");
  return data.categories;
}

export async function getCategoryBySlug(slug) {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function getFeaturedVideos() {
  const data = await readJson("featured-videos.json");
  return data.featured;
}

export async function getTikTokVideos() {
  const data = await readJson("tiktok-videos.json");
  return data.videos;
}

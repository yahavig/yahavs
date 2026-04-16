import { getCategories } from "@/lib/content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yahavs.com";

export default async function sitemap() {
  const categories = await getCategories();

  const categoryRoutes = categories.map((c) => ({
    url: `${BASE_URL}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...categoryRoutes,
  ];
}

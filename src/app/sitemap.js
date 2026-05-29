const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yahavguetta.com";

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: BASE_URL,                       lastModified, changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/about`,            lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/content`,          lastModified, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/community`,        lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/accessibility`,    lastModified, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/privacy`,          lastModified, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/terms`,            lastModified, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/disclosure`,       lastModified, changeFrequency: "yearly",  priority: 0.3 },
  ];
}

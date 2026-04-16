import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoCard from "@/components/cards/VideoCard";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import {
  getSiteConfig,
  getCategories,
  getCategoryBySlug,
} from "@/lib/content";
import { searchChannelVideos } from "@/lib/youtube";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} | yahav's`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const [siteConfig, category] = await Promise.all([
    getSiteConfig(),
    getCategoryBySlug(slug),
  ]);

  if (!category) notFound();

  const videos = await searchChannelVideos(category.searchKeyword);

  return (
    <>
      <Header navItems={siteConfig.navItems} />

      <main id="main-content" className="flex-1 pt-32 pb-20">
        <Container>
          <AnimatedEntry>
            <SectionHeading
              title={category.name}
              subtitle={category.description}
            />
          </AnimatedEntry>

          {videos.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} />
              ))}
            </div>
          ) : (
            <AnimatedEntry delay={0.15}>
              <div className="rounded-2xl bg-[var(--color-surface)] p-12 text-center shadow-[var(--shadow-card)]">
                <p className="text-lg text-[var(--color-text-secondary)]">
                  עדיין אין סרטונים בקטגוריה הזו.
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-tertiary)]">
                  חברו את YouTube API כדי לראות תכנים כאן.
                </p>
              </div>
            </AnimatedEntry>
          )}
        </Container>
      </main>

      <Footer
        socialLinks={siteConfig.socialLinks}
        siteName={siteConfig.title}
      />
    </>
  );
}

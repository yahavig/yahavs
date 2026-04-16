import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import { getSiteConfig } from "@/lib/content";
import { getLatestVideos } from "@/lib/youtube";
import { getLatestTikToks } from "@/lib/tiktok";
import Carousel from "@/components/ui/Carousel";
import VideoCard from "@/components/cards/VideoCard";
import TikTokCard from "@/components/cards/TikTokCard";

export const revalidate = 3600;

export default async function ContentPage() {
  const [siteConfig, youtubeVideos, tiktokVideos] = await Promise.all([
    getSiteConfig(), getLatestVideos(), getLatestTikToks(),
  ]);

  return (
    <>
      <Header navItems={siteConfig.navItems} />
      <main id="main-content" className="flex-1 pt-24 pb-16">
        <Container>
          <AnimatedEntry>
            <p className="mb-2 text-[11px] font-medium tracking-[0.25em] text-[var(--color-text-tertiary)] uppercase">תוכן</p>
            <h1 className="mb-8 text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">הסרטונים שלי</h1>
          </AnimatedEntry>

          {youtubeVideos.length > 0 && (
            <div className="mb-12">
              <AnimatedEntry><h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">YouTube</h2></AnimatedEntry>
              <Carousel>
                {youtubeVideos.map((v, i) => <div key={v.id} className="w-72 shrink-0 sm:w-80"><VideoCard video={v} index={i} /></div>)}
              </Carousel>
            </div>
          )}

          {tiktokVideos.length > 0 && (
            <div>
              <AnimatedEntry><h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">TikTok</h2></AnimatedEntry>
              <Carousel>
                {tiktokVideos.map((v, i) => <div key={v.url} className="w-44 shrink-0 sm:w-52"><TikTokCard video={v} index={i} /></div>)}
              </Carousel>
            </div>
          )}
        </Container>
      </main>
      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

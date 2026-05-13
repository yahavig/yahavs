import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SocialSection from "@/components/sections/SocialSection";
import PodcastSection from "@/components/sections/PodcastSection";
import CommunitySection from "@/components/sections/CommunitySection";
import AboutSection from "@/components/sections/AboutSection";
import { getSiteConfig } from "@/lib/content";
import { getLatestVideos } from "@/lib/youtube";
import { getLatestTikToks } from "@/lib/tiktok";
import fs from "fs/promises";
import path from "path";

async function getInstagramPosts() {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "content", "instagram-posts.json"), "utf-8");
    const { posts = [] } = JSON.parse(raw);
    return posts;
  } catch { return []; }
}

export default async function Home() {
  const [siteConfig, youtubeVideos, tiktokVideos, instagramPosts] = await Promise.all([
    getSiteConfig(),
    getLatestVideos(), getLatestTikToks(), getInstagramPosts(),
  ]);

  // Index social links once — avoids repeated .find() traversals per render
  const linksByPlatform = Object.fromEntries(
    (siteConfig.socialLinks ?? []).map(l => [l.platform, l.url])
  );
  const discordLink = linksByPlatform.discord;
  const spotifyLink = linksByPlatform.spotify;

  const card = "rounded-3xl overflow-hidden glass-strong transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.008]";

  return (
    <>
      <Header navItems={siteConfig.navItems} />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <div className="space-y-3 p-3 sm:space-y-4 sm:p-4">
          <AboutSection />
          <div className={card}>
            <SocialSection youtubeVideos={youtubeVideos} tiktokVideos={tiktokVideos} instagramPosts={instagramPosts} socialLinks={siteConfig.socialLinks} />
          </div>
          <div className={card}>
            <PodcastSection spotifyUrl={spotifyLink} />
          </div>
          <div className={card}>
            <CommunitySection discordUrl={discordLink} />
          </div>
        </div>
      </main>
      {/* Spacer so the floating dock doesn't overlap the footer */}
      <div className="h-20" aria-hidden="true" />
      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

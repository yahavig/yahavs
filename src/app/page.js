import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SocialSection from "@/components/sections/SocialSection";
import AboutSection from "@/components/sections/AboutSection";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import LiquidCard from "@/components/ui/LiquidCard";
import { getSiteConfig } from "@/lib/content";
import { getLatestVideos } from "@/lib/youtube";
import { getLatestTikToks } from "@/lib/tiktok";
import { getSocialStats, formatCount } from "@/lib/stats";
import fs from "fs/promises";
import path from "path";

async function getInstagramPosts() {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "content", "instagram-posts.json"), "utf-8");
    const { posts = [] } = JSON.parse(raw);
    return posts;
  } catch { return []; }
}

async function SocialFeed({ socialLinks }) {
  const [youtubeVideos, tiktokVideos, instagramPosts, rawStats] = await Promise.all([
    getLatestVideos(), getLatestTikToks(), getInstagramPosts(), getSocialStats(),
  ]);

  // Pre-format all numbers so SocialSection stays a pure "use client" component
  const platformStats = {
    youtube: {
      subscribers: formatCount(rawStats.youtube?.subscribers),
      views:       formatCount(rawStats.youtube?.views),
      videos:      formatCount(rawStats.youtube?.videos),
    },
    tiktok: {
      followers: formatCount(rawStats.tiktok?.followers),
      likes:     formatCount(rawStats.tiktok?.likes),
      videos:    formatCount(rawStats.tiktok?.videos),
    },
    instagram: {
      followers: formatCount(rawStats.instagram?.followers),
      posts:     formatCount(rawStats.instagram?.posts),
    },
  };

  return (
    <AnimatedEntry delay={0.05}>
      <LiquidCard>
        <SocialSection
          youtubeVideos={youtubeVideos}
          tiktokVideos={tiktokVideos}
          instagramPosts={instagramPosts}
          socialLinks={socialLinks}
          platformStats={platformStats}
        />
      </LiquidCard>
    </AnimatedEntry>
  );
}

export default async function Home() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <Header navItems={siteConfig.navItems} />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <div className="space-y-4 p-3 sm:space-y-4 sm:p-4">
          <AnimatedEntry>
            <AboutSection />
          </AnimatedEntry>
          <Suspense>
            <SocialFeed socialLinks={siteConfig.socialLinks} />
          </Suspense>
        </div>
      </main>
      <div className="h-2" aria-hidden="true" />
      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

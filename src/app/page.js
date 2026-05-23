import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SocialSection from "@/components/sections/SocialSection";
import PodcastSection from "@/components/sections/PodcastSection";
import AboutSection from "@/components/sections/AboutSection";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import LiquidCard from "@/components/ui/LiquidCard";
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

async function SocialFeed({ socialLinks }) {
  const [youtubeVideos, tiktokVideos, instagramPosts] = await Promise.all([
    getLatestVideos(), getLatestTikToks(), getInstagramPosts(),
  ]);
  return (
    <AnimatedEntry delay={0.05}>
      <LiquidCard>
        <SocialSection
          youtubeVideos={youtubeVideos}
          tiktokVideos={tiktokVideos}
          instagramPosts={instagramPosts}
          socialLinks={socialLinks}
        />
      </LiquidCard>
    </AnimatedEntry>
  );
}

async function RestSections({ spotifyLink }) {
  return (
    <AnimatedEntry delay={0.05}>
      <LiquidCard>
        <PodcastSection spotifyUrl={spotifyLink} />
      </LiquidCard>
    </AnimatedEntry>
  );
}

export default async function Home() {
  const siteConfig = await getSiteConfig();
  const spotifyLink = siteConfig.socialLinks?.find(l => l.platform === "spotify")?.url;

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
          <Suspense>
            <RestSections spotifyLink={spotifyLink} />
          </Suspense>
        </div>
      </main>
      <div className="h-2" aria-hidden="true" />
      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

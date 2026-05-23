"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import Carousel from "@/components/ui/Carousel";
import VideoCard from "@/components/cards/VideoCard";
import TikTokCard from "@/components/cards/TikTokCard";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import GlassButton from "@/components/ui/GlassButton";
import AnimatedTabs from "@/components/ui/AnimatedTabs";
import { ChevronLeft } from "lucide-react";

const INSTAGRAM_URL   = "https://www.instagram.com/yahavguetta/";
const APPLE_MUSIC_URL = "https://music.apple.com/profile/yahavguetta";
const BLUE_GLASS      = "rgba(0,113,227,0.88)";
const RED_GLASS       = "rgba(252,60,68,0.82)";

const PLATFORMS = [
  { id: "youtube",    label: "YouTube",   color: "rgba(220,0,0,0.85)" },
  { id: "tiktok",     label: "TikTok",    color: "rgba(18,18,18,0.92)" },
  { id: "instagram",  label: "Instagram", color: "linear-gradient(135deg, rgba(240,148,51,0.9), rgba(228,64,30,0.88), rgba(188,24,136,0.88))" },
  { id: "applemusic", label: "Music",     color: "linear-gradient(135deg, rgba(252,60,68,0.9), rgba(255,45,85,0.88))" },
];
const VALID_TABS = new Set(PLATFORMS.map(p => p.id));

const TAB_ANIM = {
  initial:    { opacity: 0, y: 10 },
  animate:    { opacity: 1, y: 0  },
  exit:       { opacity: 0, y: -6 },
  transition: { duration: 0.22, ease: "easeOut" },
};

const REEL_ID_RE = /\/(?:reel|p)\/([A-Za-z0-9_-]+)/;

function ProfileButton({ href, label, glassColor = BLUE_GLASS }) {
  return (
    <div className="flex justify-center">
      <GlassButton href={href} external size="sm" glassColor={glassColor} className="text-white font-semibold">
        <span>{label}</span><ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
      </GlassButton>
    </div>
  );
}

function TabDescription({ children }) {
  return (
    <p className="text-center text-sm leading-relaxed text-[var(--color-text-secondary)]">
      {children}
    </p>
  );
}

function EmptyState() {
  return <p className="text-center text-[var(--color-text-secondary)]">אין סרטונים להצגה כרגע.</p>;
}

export default function SocialSection({ youtubeVideos = [], tiktokVideos = [], instagramPosts = [], socialLinks = [] }) {
  const [active, setActive] = useState("youtube");

  useEffect(() => {
    const tabParam = new URLSearchParams(window.location.search).get("tab");
    if (tabParam && VALID_TABS.has(tabParam)) setActive(tabParam);

    const handler = (e) => setActive(e.detail);
    window.addEventListener("switchSocialTab", handler);
    return () => window.removeEventListener("switchSocialTab", handler);
  }, []);

  const { youtubeUrl, tiktokUrl } = useMemo(() => {
    const map = {};
    for (const l of socialLinks) map[l.platform] = l.url;
    return { youtubeUrl: map.youtube, tiktokUrl: map.tiktok };
  }, [socialLinks]);

  const youtubeOrdered = useMemo(() => {
    const vids = youtubeVideos.slice(0, 8);
    if (vids.length >= 4) vids.splice(3, 0, vids.pop());
    return vids;
  }, [youtubeVideos]);

  const innerRef = useRef(null);
  const [height, setHeight] = useState("auto");
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="social" className="py-6 sm:py-9">
      <Container>
        <AnimatedEntry className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">בואו נהיה חברים.</h2>
          <p className="mt-2 max-w-2xl mx-auto text-sm leading-relaxed text-[var(--color-text-secondary)]">
            אני יודע, אני יודע, יש יותר מדי פלטפורמות וגם לי זה לא עושה טוב:
          </p>
        </AnimatedEntry>

        <div className="mt-4 mb-3 flex justify-center">
          <AnimatedTabs tabs={PLATFORMS} activeTab={active} onTabChange={setActive} />
        </div>

        <motion.div animate={{ height }} transition={{ duration: 0.3, ease: "linear" }} style={{ overflow: "hidden" }}>
          <div ref={innerRef}>
            <AnimatePresence mode="wait">

              {active === "instagram" && (
                <motion.div key="instagram" className="flex flex-col gap-4" {...TAB_ANIM}>
                  <TabDescription>באינסטגרם תמצאו חדשות וסטורי מעולה, גם עונה להודעות שם.</TabDescription>
                  {instagramPosts.length > 0 ? (
                    <Carousel>
                      {instagramPosts.map((post, i) => {
                        const sc = post.url.match(REEL_ID_RE)?.[1];
                        return (
                          <a key={sc || i} href={post.url} target="_blank" rel="noopener noreferrer"
                            className="block w-44 shrink-0 sm:w-52 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <div style={{ height: 390, overflow: "hidden" }}>
                              <div style={{ marginTop: -56 }}>
                                <iframe src={sc ? `https://www.instagram.com/reel/${sc}/embed/` : undefined}
                                  width="100%" height="560"
                                  style={{ border: 0, display: "block" }}
                                  loading="lazy" title={`Instagram reel ${sc}`} />
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </Carousel>
                  ) : (
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 rounded-2xl glass px-5 py-4">
                      <p className="font-semibold text-[var(--color-text-primary)]">עקבו ב-Instagram - @yahavguetta</p>
                      <span className="shrink-0 rounded-xl bg-gradient-to-r from-[#f09433] to-[#bc1888] px-4 py-2 text-sm font-semibold text-white">עקוב</span>
                    </a>
                  )}
                  <ProfileButton href={INSTAGRAM_URL} label="לפרופיל" />
                </motion.div>
              )}

              {active === "youtube" && (
                <motion.div key="youtube" className="flex flex-col gap-4" {...TAB_ANIM}>
                  <TabDescription>ביוטיוב תמצאו מדריכי רכישה ודעות (נכונות) על מוצרי Apple.</TabDescription>
                  {youtubeOrdered.length > 0 ? (
                    <Carousel>
                      {youtubeOrdered.map((video, i) => (
                        <div key={video.id} className="w-56 shrink-0 sm:w-64 h-[210px]">
                          <VideoCard video={video} index={i} />
                        </div>
                      ))}
                    </Carousel>
                  ) : <EmptyState />}
                  {youtubeUrl && <ProfileButton href={youtubeUrl} label="לערוץ" />}
                </motion.div>
              )}

              {active === "tiktok" && (
                <motion.div key="tiktok" className="flex flex-col gap-4" {...TAB_ANIM}>
                  <TabDescription>בטיקטוק אין מבוגר אחראי (אני באמת מנסה אוקיי)?</TabDescription>
                  {tiktokVideos.length > 0 ? (
                    <Carousel>
                      {tiktokVideos.map((video, i) => (
                        <div key={video.url} className="w-44 shrink-0 sm:w-52">
                          <TikTokCard video={video} index={i} />
                        </div>
                      ))}
                    </Carousel>
                  ) : <EmptyState />}
                  {tiktokUrl && <ProfileButton href={tiktokUrl} label="לפרופיל" />}
                </motion.div>
              )}

              {active === "applemusic" && (
                <motion.div key="applemusic" className="flex flex-col items-center gap-5 py-6 text-center" {...TAB_ANIM}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/icons/music.svg" alt="Music" width={72} height={72} className="rounded-2xl shadow-lg" />
                  <p className="max-w-sm text-[var(--color-text-secondary)] leading-relaxed">
                    האמת שאני מוזיקאי בעצמי. אשחרר בהמשך שירים. אבל עד אז - תהנו קצת מהטעם הממש טוב ורחב שלי!
                  </p>
                  <ProfileButton href={APPLE_MUSIC_URL} label="לפרופיל" glassColor={RED_GLASS} />
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}

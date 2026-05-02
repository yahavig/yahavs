"use client";
import { useState, useEffect, useMemo } from "react";
import Container from "@/components/ui/Container";
import Carousel from "@/components/ui/Carousel";
import VideoCard from "@/components/cards/VideoCard";
import TikTokCard from "@/components/cards/TikTokCard";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import { ChevronLeft } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/yahavguetta/";

const GLASS_LINK = {
  backdropFilter:       "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  background:           "rgba(0, 113, 227, 0.88)",
  border:               "1px solid rgba(255, 255, 255, 0.28)",
  boxShadow:
    "inset 1.5px 1.5px 1px rgba(255,255,255,0.40), inset -1px -1px 1px rgba(255,255,255,0.15), 0 4px 20px rgba(0,113,227,0.35)",
};

const APPLE_MUSIC_URL = "https://music.apple.com/profile/yahavguetta";

// Liquid-glass style for the active tab — brand tint + blur + highlights
const GLASS_BASE = {
  backdropFilter:       "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  transition:           "all 0.3s cubic-bezier(0.16,1,0.3,1)",
};
const HIGHLIGHT =
  "inset 1.5px 1.5px 1px rgba(255,255,255,0.55), inset -1px -1px 1px rgba(255,255,255,0.22)";

const PLATFORMS = [
  {
    id: "youtube", label: "YouTube",
    glass: {
      ...GLASS_BASE,
      background:  "rgba(220, 0, 0, 0.78)",
      border:      "1px solid rgba(255,80,80,0.50)",
      boxShadow:   `${HIGHLIGHT}, 0 4px 22px rgba(220,0,0,0.38)`,
    },
  },
  {
    id: "tiktok", label: "TikTok",
    glass: {
      ...GLASS_BASE,
      background:  "rgba(18, 18, 18, 0.88)",
      border:      "1px solid rgba(105,201,208,0.45)",
      boxShadow:   `${HIGHLIGHT}, 0 4px 22px rgba(0,0,0,0.45)`,
    },
  },
  {
    id: "instagram", label: "Instagram",
    glass: {
      ...GLASS_BASE,
      background:  "linear-gradient(135deg, rgba(240,148,51,0.82), rgba(228,64,30,0.78), rgba(188,24,136,0.80))",
      border:      "1px solid rgba(240,100,100,0.50)",
      boxShadow:   `${HIGHLIGHT}, 0 4px 22px rgba(188,24,136,0.40)`,
    },
  },
  {
    id: "applemusic", label: "Music",
    glass: {
      ...GLASS_BASE,
      background:  "linear-gradient(135deg, rgba(252,60,68,0.82), rgba(255,45,85,0.78))",
      border:      "1px solid rgba(252,60,68,0.50)",
      boxShadow:   `${HIGHLIGHT}, 0 4px 22px rgba(252,60,68,0.40)`,
    },
  },
  {
    id: "facebook", label: "Facebook",
    glass: {
      ...GLASS_BASE,
      background:  "rgba(18, 100, 230, 0.82)",
      border:      "1px solid rgba(24,119,242,0.50)",
      boxShadow:   `${HIGHLIGHT}, 0 4px 22px rgba(18,100,230,0.38)`,
    },
  },
];
const VALID_TABS = new Set(PLATFORMS.map(p => p.id));

export default function SocialSection({ youtubeVideos = [], tiktokVideos = [], instagramPosts = [], socialLinks = [] }) {
  const [active, setActive] = useState("youtube");

  useEffect(() => {
    // Read tab from URL on mount (e.g. /?tab=instagram#social)
    const tabParam = new URLSearchParams(window.location.search).get("tab");
    if (tabParam && VALID_TABS.has(tabParam)) setActive(tabParam);

    // Listen for dock events (same-page navigation)
    const handler = (e) => setActive(e.detail);
    window.addEventListener("switchSocialTab", handler);
    return () => window.removeEventListener("switchSocialTab", handler);
  }, []);

  // Index social links once per prop change instead of calling .find() on every render
  const linksByPlatform = useMemo(() => {
    const map = {};
    for (const l of socialLinks) map[l.platform] = l.url;
    return map;
  }, [socialLinks]);
  const youtubeUrl = linksByPlatform.youtube;
  const tiktokUrl = linksByPlatform.tiktok;

  return (
    <section id="social" className="py-16 sm:py-24">
      <Container>
        <AnimatedEntry className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">בואו נהיה חברים.</h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-loose text-[var(--color-text-secondary)]">
            בכל פלטפורמה קורה משהו קצת אחר, כי כנראה אישיות אחת לא הספיקה. באינסטגרם תמצאו סטוריז, יומיום וגם מענה להודעות. ביוטיוב יש אפל, מדריכים ודעות שלא ביקשתם. בטיקטוק אין באמת מבוגר אחראי. נתראה שם, או איפה שהאלגוריתם יחליט.
          </p>
        </AnimatedEntry>

        {/* Platform tabs */}
        <div className="mt-8 mb-6 flex gap-3 flex-wrap justify-center">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`rounded-full px-6 py-3 text-base font-semibold transition-all duration-300 ${
                active === p.id
                  ? "text-white scale-[1.06]"
                  : "glass text-[var(--color-text-secondary)] hover:scale-[1.03] hover:text-[var(--color-text-primary)]"
              }`}
              style={active === p.id ? p.glass : undefined}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Instagram */}
        {active === "instagram" && (
          <div>
            {instagramPosts.length > 0 ? (
              <Carousel>
                {instagramPosts.map((post, i) => {
                  const sc = post.url.match(/\/(?:reel|p)\/([A-Za-z0-9_-]+)/)?.[1];
                  const embedUrl = sc ? `https://www.instagram.com/reel/${sc}/embed/` : null;
                  return (
                    <a key={sc || i} href={post.url} target="_blank" rel="noopener noreferrer"
                      className="w-44 shrink-0 sm:w-52 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      style={{ display: "block" }}>
                      <div style={{ height: 305, overflow: "hidden" }}>
                        {/* Inner shift: hides top header */}
                        <div style={{ marginTop: -56 }}>
                          <iframe
                            src={embedUrl}
                            width="100%"
                            height="490"
                            style={{ border: 0, display: "block" }}
                            scrolling="no"
                            allowTransparency
                            loading="lazy"
                            title={`Instagram reel ${sc}`}
                          />
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
            <div className="mt-4 flex justify-center">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
                style={GLASS_LINK}>
                <span>לפרופיל המלא</span>
                <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {/* YouTube */}
        {active === "youtube" && (
          <div>
            {youtubeVideos.length > 0 ? (
              <Carousel>
                {youtubeVideos.slice(0, 8).map((video, i) => (
                  <div key={video.id} className="w-72 shrink-0 sm:w-80">
                    <VideoCard video={video} index={i} />
                  </div>
                ))}
              </Carousel>
            ) : (
              <p className="text-[var(--color-text-secondary)]">אין סרטונים להצגה כרגע.</p>
            )}
            {youtubeUrl && (
              <div className="mt-4 flex justify-center">
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
                  style={GLASS_LINK}>
                  <span>לערוץ המלא</span>
                  <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* TikTok */}
        {active === "tiktok" && (
          <div>
            {tiktokVideos.length > 0 ? (
              <Carousel>
                {tiktokVideos.map((video, i) => (
                  <div key={video.url} className="w-44 shrink-0 sm:w-52">
                    <TikTokCard video={video} index={i} />
                  </div>
                ))}
              </Carousel>
            ) : (
              <p className="text-[var(--color-text-secondary)]">אין סרטונים להצגה כרגע.</p>
            )}
            {tiktokUrl && (
              <div className="mt-4 flex justify-center">
                <a href={tiktokUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
                  style={GLASS_LINK}>
                  <span>לפרופיל TikTok</span>
                  <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Music */}
        {active === "applemusic" && (
          <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/music.svg" alt="Music" width={72} height={72} className="rounded-2xl shadow-lg" />
            <p className="max-w-sm text-[var(--color-text-secondary)] leading-relaxed">
              האמת שאני מוזיקאי בעצמי. אשחרר בהמשך שירים. אבל עד אז - תהנו קצת מהטעם הממש טוב ורחב שלי!
            </p>
            <a
              href={APPLE_MUSIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
              style={GLASS_LINK}
            >
              <span>לפרופיל Music</span>
              <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        )}

        {/* Facebook */}
        {active === "facebook" && (
          <div className="flex items-center justify-center py-16">
            <a
              href="https://www.facebook.com/yahavguetta/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-300 hover:scale-105"
              style={{
                backdropFilter:       "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                background:           "rgba(255, 255, 255, 0.92)",
                border:               "1px solid rgba(255, 255, 255, 0.6)",
                boxShadow:
                  "inset 1.5px 1.5px 1px rgba(255,255,255,0.9), inset -1px -1px 1px rgba(255,255,255,0.5), 0 4px 20px rgba(24,119,242,0.25)",
                color: "#1877F2",
              }}
            >
              <span>שיטפוסטר מקצועי מאז 2012</span>
              <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}

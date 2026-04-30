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
import { ChevronLeft } from "lucide-react";
import fs from "fs/promises";
import path from "path";

export const revalidate = 3600;

const GLASS_BTN = {
  backdropFilter:       "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  background:           "rgba(0, 113, 227, 0.88)",
  border:               "1px solid rgba(255, 255, 255, 0.28)",
  boxShadow:
    "inset 1.5px 1.5px 1px rgba(255,255,255,0.40), inset -1px -1px 1px rgba(255,255,255,0.15), 0 4px 20px rgba(0,113,227,0.35)",
};

const blueBtnClass =
  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105";

async function getInstagramPosts() {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "content", "instagram-posts.json"), "utf-8");
    const { posts = [] } = JSON.parse(raw);
    return posts;
  } catch { return []; }
}

export default async function ContentPage() {
  const [siteConfig, youtubeVideos, tiktokVideos, instagramPosts] = await Promise.all([
    getSiteConfig(), getLatestVideos(), getLatestTikToks(), getInstagramPosts(),
  ]);

  const linksByPlatform = Object.fromEntries(
    (siteConfig.socialLinks ?? []).map(l => [l.platform, l.url])
  );

  return (
    <>
      <Header navItems={siteConfig.navItems} />
      <main id="main-content" className="flex-1 pt-24 pb-16">
        <Container>
          <AnimatedEntry>
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">הסרטונים שלי</h1>
            <p className="mb-10 max-w-2xl text-lg leading-loose text-[var(--color-text-secondary)]">
              בכל רשת התוכן שלי נראה קצת אחר - כי בכל אחת יש פורמט שונה, קהל שונה וקצב שונה. ריכזתי כאן את הכל במקום אחד, עם הסבר קצר על כל פלטפורמה.
            </p>
          </AnimatedEntry>

          {youtubeVideos.length > 0 && (
            <AnimatedEntry>
              <div
                className="mb-4 rounded-3xl py-8 shadow-[0_2px_24px_rgba(0,0,0,0.07)] overflow-hidden"
                style={{ background: "linear-gradient(145deg, #FF0000 0%, #B20000 100%)" }}
              >
                <div className="px-8 sm:px-10">
                  <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">YouTube</h2>
                  <p className="mb-6 max-w-2xl text-lg leading-loose text-white/90">
                    ביוטיוב אני בפורמט הכי רציני. סרטונים ארוכים, מדריכים מעמיקים, סקירות של מוצרים ופיצ׳רים חדשים, ופרשנות מלאה על הכרזות של אפל. זה המקום אליו אני חוזר כשיש לי מה לומר לעומק, כולל תחקיר, עריכה וסבלנות. מי שמחפש תשובה מסודרת - כדאי להתחיל כאן.
                  </p>
                </div>
                <Carousel stripClassName="ps-8 pe-8 sm:ps-10 sm:pe-10">
                  {youtubeVideos.map((v, i) => <div key={v.id} className="w-72 shrink-0 sm:w-80"><VideoCard video={v} index={i} /></div>)}
                </Carousel>
                {linksByPlatform.youtube && (
                  <div className="px-8 sm:px-10 mt-6">
                    <a href={linksByPlatform.youtube} target="_blank" rel="noopener noreferrer" className={blueBtnClass} style={GLASS_BTN}>
                      <span>לערוץ היוטיוב המלא</span>
                      <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            </AnimatedEntry>
          )}

          {tiktokVideos.length > 0 && (
            <AnimatedEntry>
              <div
                className="mb-4 rounded-3xl py-8 shadow-[0_2px_24px_rgba(0,0,0,0.07)] overflow-hidden"
                style={{ background: "linear-gradient(145deg, #000000 0%, #25F4EE 100%)" }}
              >
                <div className="px-8 sm:px-10">
                  <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">TikTok</h2>
                  <p className="mb-6 max-w-2xl text-lg leading-loose text-white/90">
                    בטיקטוק אני בלי מעצורים. קליפים קצרים, ישירים, לפעמים מצחיקים, לפעמים חדים, ותמיד מהירים. זה המקום שבו אני מגיב לשמועות ברגע שהן יוצאות, קופץ על טרנדים, ומעלה דברים שפחות היו מתאימים ליוטיוב המסודר. בקיצור, יוטיוב זה אני אחרי תחקיר, טיקטוק זה אני באמצע המחשבה.
                  </p>
                </div>
                <Carousel stripClassName="ps-8 pe-8 sm:ps-10 sm:pe-10">
                  {tiktokVideos.map((v, i) => <div key={v.url} className="w-44 shrink-0 sm:w-52"><TikTokCard video={v} index={i} /></div>)}
                </Carousel>
                {linksByPlatform.tiktok && (
                  <div className="px-8 sm:px-10 mt-6">
                    <a href={linksByPlatform.tiktok} target="_blank" rel="noopener noreferrer" className={blueBtnClass} style={GLASS_BTN}>
                      <span>לפרופיל TikTok המלא</span>
                      <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            </AnimatedEntry>
          )}

          {instagramPosts.length > 0 && (
            <AnimatedEntry>
              <div
                className="rounded-3xl py-8 shadow-[0_2px_24px_rgba(0,0,0,0.07)] overflow-hidden"
                style={{ background: "linear-gradient(145deg, #f09433 0%, #e6683c 35%, #dc2743 65%, #bc1888 100%)" }}
              >
                <div className="px-8 sm:px-10">
                  <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">Instagram</h2>
                  <p className="mb-6 max-w-2xl text-lg leading-loose text-white/90">
                    באינסטגרם אני הכי משוחרר. זה המקום לסטוריז מהיום יום, תמונות, הצצות מאחורי הקלעים, בדיחות פנימיות, ותגובות בזמן אמת לכל מה שאפל מכריזה או שוקדת עליו. זה הכי קרוב שיש לתוכן ״לא ערוך״ - כמו לעקוב אחרי חבר, לא אחרי יוצר.
                  </p>
                </div>
                <Carousel stripClassName="ps-8 pe-8 sm:ps-10 sm:pe-10">
                  {instagramPosts.map((post, i) => {
                    const sc = post.url.match(/\/p\/([A-Za-z0-9_-]+)/)?.[1];
                    return (
                      <a
                        key={sc || i}
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex w-44 shrink-0 flex-col overflow-hidden rounded-2xl bg-white/15 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 sm:w-52"
                      >
                        <div className="aspect-square w-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="white" opacity="0.4" aria-hidden="true">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                          </svg>
                        </div>
                        <div className="px-3 py-2.5">
                          <span className="text-xs text-white/80">@yahavguetta</span>
                        </div>
                      </a>
                    );
                  })}
                </Carousel>
                {linksByPlatform.instagram && (
                  <div className="px-8 sm:px-10 mt-6">
                    <a href={linksByPlatform.instagram} target="_blank" rel="noopener noreferrer" className={blueBtnClass} style={GLASS_BTN}>
                      <span>לפרופיל Instagram המלא</span>
                      <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            </AnimatedEntry>
          )}
        </Container>
      </main>
      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

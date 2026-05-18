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
import GlassButton from "@/components/ui/GlassButton";
import fs from "fs/promises";
import path from "path";

export const revalidate = 3600;

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
            <h1 className="mb-6 text-2xl font-bold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] sm:text-3xl">הסרטונים שלי</h1>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-white/75">
              בכל רשת התוכן שלי נראה קצת אחר - כי בכל אחת יש פורמט שונה, קהל שונה וקצב שונה. ריכזתי כאן את הכל במקום אחד, עם הסבר קצר על כל פלטפורמה.
            </p>
          </AnimatedEntry>

          {youtubeVideos.length > 0 && (
            <AnimatedEntry>
              <div className="mb-4 rounded-3xl py-8 overflow-hidden glass-strong">
                <div className="px-8 sm:px-10">
                  <h2 className="mb-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">YouTube</h2>
                  <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    ביוטיוב אני בפורמט הכי רציני. סרטונים ארוכים, מדריכים מעמיקים, סקירות של מוצרים ופיצ׳רים חדשים, ופרשנות מלאה על הכרזות של אפל. זה המקום אליו אני חוזר כשיש לי מה לומר לעומק, כולל תחקיר, עריכה וסבלנות. מי שמחפש תשובה מסודרת - כדאי להתחיל כאן.
                  </p>
                </div>
                <Carousel stripClassName="ps-8 pe-8 sm:ps-10 sm:pe-10">
                  {youtubeVideos.map((v, i) => <div key={v.id} className="w-72 shrink-0 sm:w-80"><VideoCard video={v} index={i} /></div>)}
                </Carousel>
                {linksByPlatform.youtube && (
                  <div className="px-8 sm:px-10 mt-6">
                    <GlassButton href={linksByPlatform.youtube} external size="sm" glassColor="rgba(0,113,227,0.88)" className="text-white font-semibold">
                      <span>לערוץ</span>
                      <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
                    </GlassButton>
                  </div>
                )}
              </div>
            </AnimatedEntry>
          )}

          {tiktokVideos.length > 0 && (
            <AnimatedEntry>
              <div className="mb-4 rounded-3xl py-8 overflow-hidden glass-strong">
                <div className="px-8 sm:px-10">
                  <h2 className="mb-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">TikTok</h2>
                  <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    בטיקטוק אני בלי מעצורים. קליפים קצרים, ישירים, לפעמים מצחיקים, לפעמים חדים, ותמיד מהירים. זה המקום שבו אני מגיב לשמועות ברגע שהן יוצאות, קופץ על טרנדים, ומעלה דברים שפחות היו מתאימים ליוטיוב המסודר. בקיצור, יוטיוב זה אני אחרי תחקיר, טיקטוק זה אני באמצע המחשבה.
                  </p>
                </div>
                <Carousel stripClassName="ps-8 pe-8 sm:ps-10 sm:pe-10">
                  {tiktokVideos.map((v, i) => <div key={v.url} className="w-44 shrink-0 sm:w-52"><TikTokCard video={v} index={i} /></div>)}
                </Carousel>
                {linksByPlatform.tiktok && (
                  <div className="px-8 sm:px-10 mt-6">
                    <GlassButton href={linksByPlatform.tiktok} external size="sm" glassColor="rgba(0,113,227,0.88)" className="text-white font-semibold">
                      <span>לפרופיל</span>
                      <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
                    </GlassButton>
                  </div>
                )}
              </div>
            </AnimatedEntry>
          )}

          {instagramPosts.length > 0 && (
            <AnimatedEntry>
              <div className="rounded-3xl py-8 overflow-hidden glass-strong">
                <div className="px-8 sm:px-10">
                  <h2 className="mb-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">Instagram</h2>
                  <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    באינסטגרם אני הכי משוחרר. זה המקום לסטוריז מהיום יום, תמונות, הצצות מאחורי הקלעים, בדיחות פנימיות, ותגובות בזמן אמת לכל מה שאפל מכריזה או שוקדת עליו. זה הכי קרוב שיש לתוכן ״לא ערוך״ - כמו לעקוב אחרי חבר, לא אחרי יוצר.
                  </p>
                </div>
                <Carousel stripClassName="ps-8 pe-8 sm:ps-10 sm:pe-10">
                  {instagramPosts.map((post, i) => {
                    const sc = post.url.match(/\/(?:reel|p)\/([A-Za-z0-9_-]+)/)?.[1];
                    const embedUrl = sc ? `https://www.instagram.com/reel/${sc}/embed/` : null;
                    return (
                      <a key={sc || i} href={post.url} target="_blank" rel="noopener noreferrer"
                        className="w-44 shrink-0 sm:w-52 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        style={{ display: "block" }}>
                        <div style={{ height: 305, overflow: "hidden" }}>
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
                {linksByPlatform.instagram && (
                  <div className="px-8 sm:px-10 mt-6">
                    <GlassButton href={linksByPlatform.instagram} external size="sm" glassColor="rgba(0,113,227,0.88)" className="text-white font-semibold">
                      <span>לפרופיל</span>
                      <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
                    </GlassButton>
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

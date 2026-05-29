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

export const metadata = {
  title: "התוכן שלי | yahavguetta.com",
  description: "סרטוני YouTube וTikTok - מדריכים, סקירות ודעות על עולם Apple והטכנולוגיה.",
};

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
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] sm:text-6xl">התוכן שלי</h1>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-white/75">
              תראו, בכל רשת יש תוכן קצת אחר - הכל סביב Apple, פסיכולוגיה של האינטרנט ואוטיזם. באינסטגרם הכי כיף כי הסטורים שלי הם באמת הטובים ביותר. אני מתבכיין אבל במידה הומוריסטית כיאה לדור z בגיר. 67 am i right?
            </p>
          </AnimatedEntry>

          {youtubeVideos.length > 0 && (
            <AnimatedEntry>
              <div className="mb-4 rounded-3xl py-8 overflow-hidden glass-strong">
                <div className="px-8 sm:px-10">
                  <h2 className="mb-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">YouTube</h2>
                  <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    ביוטיוב אני מעלה תוכן שפשוט עוזר לכם, כמו מדריכי רכישה וכזה. גם פרשנות מלאה על הכרזות של Apple. זה המקום אליו אני חוזר כשיש לי מה להגיד, לאט לאט תשימו לב שאני מתחיל לדבר על הפסיכולוגיה של האינטרנט שם.
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
                    בטיקטוק אני משתדל להעלות מה שיש לי על בראש. עקרונית מה שקורה זה שאני מדבר בלי להפסיק ושם אנימציות בשביל להחזיק זמן צפיה. שם יש גם מדריכים וחדשות. לפעמים אני מגיב לשמועות או ״קופץ על טרנדים״ כמו שאומרים הצעירים.
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
                    באינסטגרם הכי כיף, כמו שאמרתי. סטוריז אני מעלה מ-2016 עוד מימי הסנאפצ׳אט. תיעוד ציני של החיים שלי. התחלתי עם זה בשביל לתקשר עם אנשים שאני צובר במסגרות מסוימות (נגיד נכון אתם מתחילים קורס, ואז מסיימים ואתם כזה לא חברים של האנשים שם אבל כיף לשמור איתם על קשר? אז ככה). מאז שהתחלתי להעלות תוכן אני מעלה כל יום כמעט את חדשות התפוח - שזה כמו שזה נשמע, הדלפות, שמועות וכל מה שחדש בעולם של Apple.<br />
                    אה ושם גם אני עונה לכל ההודעות, אז אם יש לכם שאלה...
                  </p>
                </div>
                <Carousel stripClassName="ps-8 pe-8 sm:ps-10 sm:pe-10">
                  {instagramPosts.map((post, i) => {
                    const sc = post.url.match(/\/(?:reel|p)\/([A-Za-z0-9_-]+)/)?.[1];
                    const embedUrl = sc ? `https://www.instagram.com/reel/${sc}/embed/` : undefined;
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
                              style={{ border: 0, display: "block", overflow: "hidden" }}
                              loading="lazy"
                              title={sc ? `Instagram reel ${sc}` : "Instagram post"}
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

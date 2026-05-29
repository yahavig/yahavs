import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import GlassButton from "@/components/ui/GlassButton";

export const metadata = {
  title: "קהילה | yahavguetta.com",
  description: "הצטרפו לקהילת Discord של יהב גואטה - שיחות על Apple, טכנולוגיה ועוד.",
};
import { getSiteConfig } from "@/lib/content";

export default async function CommunityPage() {
  const siteConfig = await getSiteConfig();
  const discordUrl = siteConfig.socialLinks?.find(l => l.platform === "discord")?.url;

  return (
    <>
      <Header navItems={siteConfig.navItems} />
      <main id="main-content" className="flex-1 pt-20 pb-12">
        <Container>
          <div className="rounded-3xl overflow-hidden glass-strong p-6 sm:p-8">
          <div className="mx-auto max-w-2xl">
            <AnimatedEntry>
              <h1 className="mb-4 text-6xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-7xl">שרת הדיסקורד</h1>
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                שרת הדיסקורד הוא המקום שבו התוכן ממשיך לשיחה, ואני גם שם בעצמי לאורך היום - בין אם אני לומד, עובד או פשוט קופץ לענות ולהיות חלק מהקהילה.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                אפשר פשוט לדבר איתי שם. לשאול שאלה על Apple, על תוכן, על הלימודים - או סתם על החיים. אני קורא כמעט הכל, ועונה ברוב המקרים. ואם לא עניתי - אל תיקחו את זה אישית, אני פשוט כנראה באמצע עריכה.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                וחוץ מזה - זה גם מקום מעולה פשוט להכיר חברים חדשים. אני מרגיש הרבה פעמים שפשוט אין לי עם מי לדבר. לא כי אין סביבי אנשים, אלא כי לא תמיד יש את האנשים שמתעניינים בדיוק באותם דברים, שחושבים על העולם באותה צורה, שיכולים לשבת איתי שעה על ענייני Apple, טכנולוגיה, בינה מלאכותית או תקשורת בינאישית בלי להתעייף. אני מניח שיש עוד לא מעט אנשים שמרגישים ככה - אז בואו, השרת הוא בדיוק בשביל זה.
              </p>
            </AnimatedEntry>
            {/* Discord widget */}
            <AnimatedEntry delay={0.15}>
              <div className="mt-10 flex flex-col items-center gap-6">
                {discordUrl && (
                  <GlassButton href={discordUrl} external size="sm" glassColor="rgba(100,115,240,0.72)" className="text-white font-semibold gap-2.5">
                    <DiscordIcon />
                    <span>דיסקורדיישן</span>
                  </GlassButton>
                )}
                <iframe
                  src="https://discord.com/widget?id=1219714545443012689&theme=dark"
                  width="350"
                  height="500"
                  style={{ border: 0 }}
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  className="rounded-2xl shadow-2xl max-w-full"
                  title="שרת הדיסקורד של יהב"
                />
              </div>
            </AnimatedEntry>
          </div>
          </div>
        </Container>
      </main>
      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

function DiscordIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0071E3]">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.111 18.1.129 18.116a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    </span>
  );
}

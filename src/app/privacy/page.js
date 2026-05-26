import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { getSiteConfig } from "@/lib/content";

export const metadata = {
  title: "מדיניות פרטיות | yahavguetta.com",
  description: "מדיניות הפרטיות של האתר yahavguetta.com.",
};

export default async function PrivacyPage() {
  const siteConfig = await getSiteConfig();
  const email = siteConfig.legalEmail;

  return (
    <>
      <Header navItems={siteConfig.navItems} />
      <main id="main-content" className="flex-1 pt-24 pb-16">
        <Container>
          <div className="rounded-3xl overflow-hidden glass-strong p-8 sm:p-12 mx-auto max-w-2xl">
            <h1 className="mb-8 text-6xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-7xl">פרטיות</h1>
            <div className="prose prose-sm max-w-none text-[var(--color-text-secondary)] leading-relaxed space-y-3">
              <p>
                האתר yahavguetta.com הוא אתר תוכן אישי. אין באתר טפסי הרשמה, אזור משתמשים אישי או מערכת תשלום, והאתר אינו מבקש מהמשתמשים למסור מידע אישי באופן יזום.
              </p>
              <p>
                עם זאת, במהלך השימוש באתר עשוי להיאסף מידע טכני בסיסי על ידי ספקי האחסון, מערכות אבטחה ושירותי צד שלישי המוטמעים או מקושרים באתר, כגון כתובת IP, סוג דפדפן, נתוני שימוש ועוגיות - בהתאם למדיניותם של אותם שירותים.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">שירותי צד שלישי</h2>
              <p>
                האתר עשוי לכלול קישורים והטמעות לשירותי צד שלישי, ביניהם YouTube, Spotify, Apple Podcasts, Instagram ו-TikTok. בעת צפייה בתוכן מוטמע או מעבר לשירותים אלה, ייתכן שאותם שירותים יאספו מידע, יציבו עוגיות או יפעילו כלי מדידה בהתאם למדיניות הפרטיות שלהם. למפעיל האתר אין שליטה מלאה על אופן פעולתם של שירותים אלה.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">עוגיות</h2>
              <p>
                האתר עצמו אינו עושה שימוש בעוגיות מעקב או באנליטיקס. שירותי צד שלישי המוטמעים בעמודים מסוימים (כגון נגני YouTube ו-Spotify) עשויים להניח עוגיות בדפדפן בהתאם למדיניות שלהם.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">שינויים עתידיים</h2>
              <p>
                ככל שבעתיד יתווספו לאתר טפסי יצירת קשר, רשימת תפוצה או שירותים נוספים, המידע שיימסר בהם ישמש לצורך הטיפול בפנייה או השירות המבוקש בלבד, אלא אם יצוין אחרת במפורש סמוך לאיסוף.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">יצירת קשר</h2>
              <p>
                לכל שאלה או בקשה בנושא פרטיות, ניתן לפנות בדוא״ל:{" "}
                <a href={`mailto:${email}`} className="text-[var(--color-accent)] hover:underline">{email}</a>
              </p>

              <p className="mt-6 text-xs text-[var(--color-text-tertiary)]">
                עודכן לאחרונה: {siteConfig.lastLegalUpdate}
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

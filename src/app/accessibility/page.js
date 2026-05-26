import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import { getSiteConfig } from "@/lib/content";

export const metadata = {
  title: "הצהרת נגישות | yahavguetta.com",
  description: "הצהרת נגישות לאתר yahavguetta.com.",
};

export default async function AccessibilityPage() {
  const siteConfig = await getSiteConfig();
  const email = siteConfig.legalEmail;

  return (
    <>
      <Header navItems={siteConfig.navItems} />

      <main id="main-content" className="flex-1 pt-32 pb-20">
        <Container>
          <div className="rounded-3xl overflow-hidden glass-strong p-8 sm:p-12 mx-auto max-w-2xl">
            <AnimatedEntry>
              <h1 className="text-[clamp(3.6rem,7vw,6rem)] font-bold leading-tight tracking-tight text-[var(--color-text-primary)]">
                הצהרת נגישות
              </h1>
              <p className="mt-2 text-sm text-[var(--color-text-tertiary)]">
                עודכן לאחרונה: {siteConfig.lastLegalUpdate}
              </p>
            </AnimatedEntry>

            <AnimatedEntry delay={0.1}>
              <div className="mt-10 space-y-8 text-base leading-relaxed text-[var(--color-text-secondary)]">

                <section aria-labelledby="general">
                  <h2 id="general" className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">
                    כללי
                  </h2>
                  <p>
                    אתר <strong>yahavguetta.com</strong> (להלן &ldquo;האתר&rdquo;) שואף להנגיש את שירותיו ככל הניתן לאנשים עם מוגבלויות, ברוח חוק שוויון זכויות לאנשים עם מוגבלות, התשנ&rdquo;ח-1998, ותקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&rdquo;ג-2013.
                  </p>
                  <p className="mt-3">
                    האתר נבנה במטרה לעמוד ככל האפשר בדרישות תקן ישראלי <strong>SI 5568</strong> וברמת <strong>WCAG 2.1 AA</strong>, ונמצא בתהליך בדיקה ושיפור מתמשך.
                  </p>
                </section>

                <section aria-labelledby="features">
                  <h2 id="features" className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">
                    אמצעי הנגישות באתר
                  </h2>
                  <ul className="list-disc space-y-2 ps-6">
                    <li>תמיכה בניווט מקלדת במרבית רכיבי האתר</li>
                    <li>שימוש בתגיות ARIA ו-semantic HTML לתאימות עם קוראי מסך</li>
                    <li>היררכיית כותרות (H1–H6) במרבית העמודים</li>
                    <li>תמונות מהותיות כוללות או יכללו טקסט חלופי; תמונות דקורטיביות עשויות להיות מסומנות בהתאם</li>
                    <li>שאיפה לעמוד בדרישות ניגודיות WCAG 2.1 AA</li>
                    <li>כפתור דילוג לתוכן הראשי</li>
                    <li>שפת האתר מוגדרת כראוי (lang=&ldquo;he&rdquo; + dir=&ldquo;rtl&rdquo;)</li>
                    <li>תמיכה בהגדלת טקסט באמצעות הדפדפן</li>
                    <li>כלי נגישות מובנה (כפתור בפינה השמאלית התחתונה)</li>
                  </ul>
                </section>

                <section aria-labelledby="a11y-tools">
                  <h2 id="a11y-tools" className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">
                    כלי הנגישות באתר
                  </h2>
                  <p>
                    בפינה השמאלית התחתונה של האתר מופיע כפתור נגישות. לחיצה עליו תפתח תפריט נגישות הכולל בין היתר:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 ps-6">
                    <li>הגדלה/הקטנה של גודל הטקסט</li>
                    <li>מצב ניגודיות גבוהה</li>
                    <li>היפוך צבעים</li>
                    <li>גווני אפור</li>
                    <li>הדגשת קישורים בקו תחתי</li>
                    <li>פונט קריא מוגבר</li>
                    <li>עצירת אנימציות</li>
                    <li>סמן מוגדל</li>
                    <li>ריווח מרווח בין שורות ואותיות</li>
                  </ul>
                </section>

                <section aria-labelledby="limits">
                  <h2 id="limits" className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">
                    מגבלות ידועות
                  </h2>
                  <ul className="list-disc space-y-2 ps-6">
                    <li>תוכן מוטמע מ-YouTube, TikTok ו-Instagram עשוי שלא להיות נגיש במלואו - ניתן לצפות בו ישירות בפלטפורמות אלה.</li>
                    <li>ככל שתימצא בעיית נגישות, אנחנו פועלים לתקנה בהקדם.</li>
                  </ul>
                </section>

                <section aria-labelledby="contact-a11y">
                  <h2 id="contact-a11y" className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">
                    פנייה בנושאי נגישות
                  </h2>
                  <p>
                    נתקלתם בבעיית נגישות? נשמח לעזור. ניתן לפנות בדוא״ל:
                  </p>
                  <p className="mt-2">
                    <a href={`mailto:${email}`} className="text-[var(--color-accent)] underline">{email}</a>
                  </p>
                  <p className="mt-3 text-sm">
                    מומלץ לציין בפנייה את כתובת העמוד שבו נתקלתם בבעיה, תיאור הבעיה, סוג הדפדפן והמכשיר שבו נעשה שימוש, וטכנולוגיית עזר אם נעשה בה שימוש.
                  </p>
                  <p className="mt-3">
                    ניתן גם לפנות בערוצי משנה -{" "}
                    <a href="https://www.instagram.com/yahavguetta/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">Instagram</a>
                    {" "}או{" "}
                    <a href="https://discord.gg/ptgHvwt7" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">Discord</a>
                    {" "}- אך פנייה רשמית בנושא נגישות עדיף שתישלח במייל.
                  </p>
                  <p className="mt-3">
                    אנו שואפים לטפל בפנייה תוך 5 ימי עסקים.
                  </p>
                </section>

                <section aria-labelledby="standards">
                  <h2 id="standards" className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">
                    תקנים ורגולציה
                  </h2>
                  <ul className="list-disc space-y-2 ps-6">
                    <li>תקן ישראלי <strong>SI 5568</strong> (נגישות אתרי אינטרנט) - האתר שואף לעמוד בו ככל הניתן.</li>
                    <li><strong>WCAG 2.1</strong> ברמה AA - כקווים מנחים.</li>
                    <li>חוק שוויון זכויות לאנשים עם מוגבלות, התשנ&rdquo;ח-1998</li>
                    <li>תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&rdquo;ג-2013</li>
                  </ul>
                </section>

              </div>
            </AnimatedEntry>
          </div>
        </Container>
      </main>

      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

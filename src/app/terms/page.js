import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { getSiteConfig } from "@/lib/content";

export const metadata = {
  title: "תנאי שימוש וגילוי נאות | yahavguetta.com",
  description: "תנאי השימוש וגילוי הנאות של האתר yahavguetta.com.",
};

export default async function TermsPage() {
  const siteConfig = await getSiteConfig();
  const email = siteConfig.legalEmail;

  return (
    <>
      <Header navItems={siteConfig.navItems} />
      <main id="main-content" className="flex-1 pt-24 pb-16">
        <Container>
          <div className="rounded-xl overflow-hidden glass-strong p-8 sm:p-12 mx-auto max-w-2xl">
            <h1 className="mb-8 text-6xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-7xl">תנאי שימוש</h1>

            <div className="prose prose-sm max-w-none text-[var(--color-text-secondary)] leading-relaxed space-y-3">
              <p>
                ברוכים הבאים ל-yahavguetta.com (להלן &ldquo;האתר&rdquo;). השימוש באתר כפוף לתנאים הבאים. עצם השימוש באתר מהווה הסכמה לתנאים אלה.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">אופי התוכן</h2>
              <p>
                האתר מציג תוכן אישי ומקצועי בעולמות הטכנולוגיה, מוצרי Apple וחוויות אישיות. התוכן הוא מידע כללי, דעה ופרשנות בלבד, ואינו מהווה ייעוץ מקצועי, משפטי, פיננסי, רפואי או טיפולי.
              </p>
              <p>
                המלצות רכישה, סקירות ודעות הן עמדה אישית של מפעיל האתר ואינן מהוות התחייבות להתאמה אישית לצרכים של המשתמש. כל החלטת רכישה היא באחריות המשתמש בלבד.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">הסתמכות וגבולות אחריות</h2>
              <p>
                האתר מוצג כפי שהוא (&ldquo;as is&rdquo;). מפעיל האתר אינו מתחייב שהאתר יהיה זמין באופן רציף, נקי משגיאות או חופשי מתקלות. השימוש באתר ובמידע המופיע בו הוא באחריות המשתמש בלבד.
              </p>
              <p>
                למפעיל האתר אין שליטה על אתרים חיצוניים שאליהם יש קישור או שמהם מוטמע תוכן (כגון YouTube, Instagram, TikTok ועוד), ולא תחול עליו אחריות על תכניהם, על זמינותם או על מדיניות הפרטיות שלהם.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">תוכן בנושאי בריאות ואוטיזם</h2>
              <p>
                תכנים העוסקים באוטיזם, חוויות אישיות או התמודדות נפשית מבוססים על ניסיון אישי ותובנות כלליות בלבד, ואינם מהווים ייעוץ רפואי, פסיכולוגי, טיפולי או אבחוני. בכל מקרה הדורש החלטה רפואית או טיפולית, יש לפנות לאיש מקצוע מוסמך.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">קניין רוחני</h2>
              <p>
                כל הזכויות בתכנים המקוריים שבאתר - לרבות טקסטים, עיצובים, גרפיקה וסרטונים שנוצרו על ידי מפעיל האתר - שמורות למפעיל האתר. אין להעתיק, לשכפל, להפיץ, לפרסם או לעשות כל שימוש מסחרי בתכנים אלה ללא אישור מראש ובכתב, למעט שימוש הוגן בהתאם לדין.
              </p>
              <p>
                ככל שמופיעים באתר תכנים שאינם של מפעיל האתר (כגון לוגואים של חברות, צילומי מסך, אייקונים של פלטפורמות, סיכומי כתבות וכד&rsquo;), הם משמשים לצורכי מידע, סקירה וביקורת, וזכויות היוצרים בהם שייכות לבעליהן.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">גילוי נאות</h2>
              <p>
                כחלק משקיפות מול הקוראים, להלן פירוט של הקשרים המקצועיים והמסחריים הרלוונטיים לתכנים באתר.
              </p>
              <p>
                בעבר השתתפתי בפרסומת של iDigital ויצרתי איתם תוכן. אני עוסק רבות במוצרי Apple כצרכן וכיוצר תוכן, ומעיר עליהם דעות אישיות. המידע שאני מציג על מוצרי Apple ו-iDigital אינו מהווה דבר פרסומת מטעמם, אלא אם צוין במפורש בסמוך לתוכן הרלוונטי.
              </p>
              <p>
                ככל שיופיע באתר תוכן הכולל שיתוף פעולה מסחרי, קישור מתוגמל (affiliate), הטבה, חסות או תמורה כלשהי - הדבר יצוין במפורש בסמוך לאותו תוכן, באמצעות אחת מהמילים הבאות: &ldquo;ממומן&rdquo;, &ldquo;בשיתוף פעולה עם&rdquo;, &ldquo;חסות&rdquo;, &ldquo;קישור מתוגמל&rdquo; או ניסוח דומה. בהיעדר ציון כזה, יש להניח שאין מאחורי התוכן תמורה כספית או חומרית.
              </p>
              <p>
                שמות חברות, מוצרים, לוגואים וסימני מסחר המופיעים באתר שייכים לבעליהם בהתאמה, ומופיעים לצורכי הקשר, מידע, סקירה וביקורת בלבד. אזכור של חברה או מוצר אינו מעיד על קשר מסחרי איתם, אלא אם צוין במפורש.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">שינויים באתר ובתנאים</h2>
              <p>
                מפעיל האתר רשאי לעדכן, לשנות, להוסיף או להסיר תכנים, עמודים או שירותים בכל עת, וללא הודעה מוקדמת. תנאי שימוש אלה עשויים להתעדכן מעת לעת, וגרסתם העדכנית היא הקובעת.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">דין וסמכות שיפוט</h2>
              <p>
                על תנאי השימוש באתר ועל כל סכסוך הנובע מהשימוש בו יחולו דיני מדינת ישראל בלבד. סמכות השיפוט הבלעדית בכל עניין הקשור באתר נתונה לבתי המשפט המוסמכים במחוז תל אביב-יפו.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">יצירת קשר</h2>
              <p>
                בכל שאלה או פנייה הנוגעת לתנאים אלה ניתן לפנות בדוא״ל:{" "}
                <a href={`mailto:${email}`} className="text-[var(--color-accent-text)] hover:underline">{email}</a>
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

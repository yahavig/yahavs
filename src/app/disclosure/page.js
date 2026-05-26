import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { getSiteConfig } from "@/lib/content";

export const metadata = {
  title: "גילוי נאות | yahavguetta.com",
  description: "גילוי נאות לגבי קשרים מסחריים ושיתופי פעולה באתר yahavguetta.com.",
};

export default async function DisclosurePage() {
  const siteConfig = await getSiteConfig();
  const email = siteConfig.legalEmail;

  return (
    <>
      <Header navItems={siteConfig.navItems} />
      <main id="main-content" className="flex-1 pt-24 pb-16">
        <Container>
          <div className="rounded-3xl overflow-hidden glass-strong p-8 sm:p-12 mx-auto max-w-2xl">
            <h1 className="mb-8 text-6xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-7xl">גילוי נאות</h1>

            <div className="prose prose-sm max-w-none text-[var(--color-text-secondary)] leading-relaxed space-y-3">
              <p>
                כחלק משקיפות מול הקוראים, להלן פירוט של הקשרים המקצועיים והמסחריים הרלוונטיים לתכנים באתר.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">עבודה עם iDigital ו-Apple</h2>
              <p>
                בעבר השתתפתי בפרסומת של iDigital ויצרתי איתם תוכן. אני עוסק רבות במוצרי Apple כצרכן וכיוצר תוכן, ומעיר עליהם דעות אישיות.
              </p>
              <p>
                המידע שאני מציג על מוצרי Apple ו-iDigital אינו מהווה דבר פרסומת מטעמם, אלא אם צוין במפורש בסמוך לתוכן הרלוונטי.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">שיתופי פעולה ותוכן ממומן</h2>
              <p>
                ככל שיופיע באתר תוכן הכולל שיתוף פעולה מסחרי, קישור מתוגמל (affiliate), הטבה, חסות או תמורה כלשהי - הדבר יצוין במפורש בסמוך לאותו תוכן, באמצעות אחת מהמילים הבאות: &ldquo;ממומן&rdquo;, &ldquo;בשיתוף פעולה עם&rdquo;, &ldquo;חסות&rdquo;, &ldquo;קישור מתוגמל&rdquo; או ניסוח דומה.
              </p>
              <p>
                בהיעדר ציון כזה, יש להניח שאין מאחורי התוכן תמורה כספית או חומרית.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">המלצות רכישה ודעות</h2>
              <p>
                המלצות הרכישה והדעות באתר משקפות את דעתי האישית בלבד בזמן הפרסום, ואינן מהוות התחייבות להתאמה אישית לצרכים שלכם. אני עשוי לשנות את דעתי על מוצר בעקבות עדכוני תוכנה, ניסיון מצטבר או מידע חדש.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">חברות ומותגים נוספים</h2>
              <p>
                שמות חברות, מוצרים, לוגואים וסימני מסחר המופיעים באתר שייכים לבעליהם בהתאמה, ומופיעים לצורכי הקשר, מידע, סקירה וביקורת בלבד. אזכור של חברה או מוצר אינו מעיד על קשר מסחרי איתם, אלא אם צוין במפורש.
              </p>

              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">יצירת קשר</h2>
              <p>
                בכל שאלה בנושא גילוי נאות, שיתופי פעולה או פרסום באתר, ניתן לפנות בדוא״ל:{" "}
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

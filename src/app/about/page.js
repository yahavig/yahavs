import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import { getSiteConfig } from "@/lib/content";

export async function generateMetadata() {
  return {
    title: "עליי | yahav's",
    description: "נעים מאוד, יהב. יכול להיות שנתקלתם בתוכן שלי.",
  };
}

const SOCIAL_COLORS = {
  youtube:   { bg: "bg-[#FF0000]",   label: "YouTube"   },
  tiktok:    { bg: "bg-[#010101]",   label: "TikTok"    },
  instagram: { bg: "bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888]", label: "Instagram" },
  discord:   { bg: "bg-[#5865F2]",   label: "Discord"   },
  spotify:   { bg: "bg-[#1DB954]",   label: "Podcast"   },
};

const card = "rounded-3xl overflow-hidden bg-white shadow-[0_2px_24px_rgba(0,0,0,0.07)]";
const prose = "text-[1.0625rem] leading-[1.85] text-[var(--color-text-secondary)]";
const eyebrow = "mb-4 text-[11px] font-semibold tracking-[0.25em] text-[var(--color-text-tertiary)] uppercase";

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <Header navItems={siteConfig.navItems} />

      <main id="main-content" className="flex-1 bg-[#F5F5F7]">

        {/* Page header */}
        <div className="pt-28 pb-8 text-center">
          <AnimatedEntry>
            <p className="mb-3 text-[11px] font-medium tracking-[0.3em] text-[var(--color-text-tertiary)] uppercase">yahav guetta</p>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tight text-[var(--color-text-primary)]">עליי</h1>
          </AnimatedEntry>
        </div>

        <div className="space-y-3 p-3 sm:space-y-4 sm:p-4">

          {/* 1. Intro - headshot + opener */}
          <AnimatedEntry>
            <div className={card}>
              <div className="grid md:grid-cols-2">
                <div className="relative min-h-[380px] md:min-h-[500px] bg-[#1a1a1a] overflow-hidden">
                  <Image
                    src="/images/about-headshot.jpg"
                    alt="יהב גואטה"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center px-8 py-12 sm:px-14">
                  <p className={eyebrow}>היי</p>
                  <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
                    נעים מאוד,<br />יהב.
                  </h2>
                  <div className={`mt-6 space-y-4 ${prose}`}>
                    <p>
                      יכול להיות שנתקלתם בתוכן שלי. זה התחיל בכלל מזה שנמאס לי לעזור לחברים בטלפון בתור מנהל ב-iDigital, אז התחלתי להכין מדריכים ברורים על Apple.
                    </p>
                    <p>
                      משם, בלי שתכננתי, אנשים התחילו לרצות לשמוע ממני גם על אוטיזם - דווקא על הדבר שניסיתי להסתיר כל החיים.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 2. Childhood & tech */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-8 py-12 sm:px-14`}>
              <p className={eyebrow}>ילדות</p>
              <h2 className="mb-8 text-2xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                מאז שהייתי ילד, נמשכתי לטכנולוגיה כמעט בצורה אינסטינקטיבית.
              </h2>
              <div className={`max-w-2xl space-y-5 ${prose}`}>
                <p>
                  אהבתי מחשבים, פירקתי והרכבתי כמעט כל מוצר חשמלי שהגיע אליי לידיים, וסיקרן אותי להבין לא רק איך דברים עובדים - אלא למה הם בנויים כמו שהם בנויים.
                </p>
                <p>
                  בדיעבד, אני חושב שזה היה גם המקום שבו מצאתי סדר. מסגרות אנושיות היו לי הרבה פחות פשוטות. היה לי קשה להשתלב, להבין קודים חברתיים, ולהרגיש טבעי בתוך העולם של כולם. היום אני יודע שלזה היה קשר גם לאוטיזם, אבל אז פשוט הרגשתי שאני קורא את העולם בשפה קצת אחרת.
                </p>
                <p>
                  אולי בגלל זה התחברתי כל כך למכונות: הן היו ברורות, עקביות, הגיוניות. וכשמבינים אותן - הן לא שופטות אותך.
                </p>
              </div>
            </div>
          </AnimatedEntry>

          {/* 3. iDigital career - studio photo */}
          <AnimatedEntry delay={0.05}>
            <div className={card}>
              <div className="grid md:grid-cols-2">
                <div className="flex flex-col justify-center px-8 py-12 sm:px-14">
                  <p className={eyebrow}>הקריירה</p>
                  <h2 className="mb-6 text-2xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                    iDigital, ניהול, ואז מול מצלמה.
                  </h2>
                  <div className={`space-y-4 ${prose}`}>
                    <p>
                      הדרך המקצועית שלי התחילה ב-iDigital. עבדתי עם מוצרי Apple ביום יום, צברתי היכרות עמוקה, והתקדמתי בתקופת הקורונה לתפקיד ניהולי תחת סמנכ״ל. תקופה אינטנסיבית עם הרבה אחריות וקצב גבוה.
                    </p>
                    <p>
                      היא גם חידדה לי משהו חשוב על עצמי: אני לא רק אוהב טכנולוגיה - אני אוהב לתווך אותה. להסביר, לפשט, ולתרגם אותה למשהו שאנשים באמת יכולים להבין ולהרגיש בנוח איתו.
                    </p>
                    <p>
                      קצת כמו שהייתי רוצה שיסבירו לי על תקשורת בין אישית - חכו, עוד נגיע לזה.
                    </p>
                  </div>
                </div>
                <div className="relative min-h-[340px] overflow-hidden">
                  <Image
                    src="/images/about-studio.jpg"
                    alt="יהב בסטודיו"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 4. Creating content */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-8 py-12 sm:px-14`}>
              <p className={eyebrow}>התוכן</p>
              <h2 className="mb-8 text-2xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                נמאס לי לשבת חצי שעה על שיחת טלפון.
              </h2>
              <div className={`max-w-2xl space-y-5 ${prose}`}>
                <p>
                  התחלתי ליצור מדריכים קצרים על מוצרי Apple מסיבה פשוטה מאוד: אם היה קיים מדריך ברור, גם החבר היה מקבל תשובה יותר טובה וגם אני הייתי חוסך את כל הסיבוב. לאט לאט הם התחילו לתפוס גם בטיקטוק.
                </p>
                <p>
                  פתאום גיליתי שיש לי לא רק ידע, אלא יכולת לעזור לאנשים. אני יודע לקחת נושא טכני, לפרק אותו, ולהגיש אותו בצורה שאנשים באמת רוצים לצרוך.
                </p>
                <p>
                  חזרתי לעבוד בחנויות כאקספרט ובמקביל התחלתי להצטלם לסרטונים של iDigital. החיבור הזה - בין עבודה עם אנשים בשטח לבין עמידה מול מצלמה - הרגיש לי טבעי באופן כמעט מוזר. שירות, פתרון בעיות, הכוונה מצד אחד. תוכן, מסר, נוכחות מצד שני. שם הבנתי שזה לא ״או זה או זה״ - זה בדיוק שניהם.
                </p>
              </div>
            </div>
          </AnimatedEntry>

          {/* 5. Bar-Ilan + the big thesis */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-8 py-12 sm:px-14`}>
              <p className={eyebrow}>בר-אילן</p>
              <h2 className="mb-8 text-2xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                אנחנו חיים בתקופה הכי מרגשת בתולדות האנושות.
              </h2>
              <div className={`max-w-2xl space-y-5 ${prose}`}>
                <p>
                  לא בגלל שבינה מלאכותית נכנסה לחיים שלנו - אלא בגלל ששינוי הרבה יותר עמוק קורה: שינוי באופן שבו בני אדם חושבים, מרגישים, לומדים, מחפשים משמעות, ובונים זהות דרך מידע. האינטרנט כבר מזמן לא רק מקום שנכנסים אליו - הוא סביבה, שפה, ומבחינות רבות גם מערכת ההפעלה של התודעה המודרנית.
                </p>
                <p>
                  בגלל זה בחרתי ללמוד מדעי המידע ויישומי בינה מלאכותית בבר-אילן. התחום לא עוסק רק בטכנולוגיה עצמה - אלא גם בשאלות כמו: איך אנשים מחפשים מידע, איך הם מפרשים אותו, איך נבנית סמכות בעולם מוצף תוכן, מה אלגוריתמים עושים לקשב שלנו, ואיך חוויה דיגיטלית משנה התנהגות.
                </p>
                <p>
                  מבחינתי אלה לא רק מושגים אקדמיים - אלה כלים להבין את המציאות שאנחנו כבר חיים בתוכה. ואני רוצה להמשיך בזה לתואר שני, ואולי אפילו דוקטורט - דווקא מהכיוון החברתי, האנושי והפסיכולוגי.
                </p>
              </div>
            </div>
          </AnimatedEntry>

          {/* 6. Autism - photo + story */}
          <AnimatedEntry delay={0.05}>
            <div className={card}>
              <div className="grid md:grid-cols-2">
                <div className="relative min-h-[380px] overflow-hidden">
                  <Image
                    src="/images/about-paris.jpg"
                    alt="יהב ילד ליד מגדל אייפל"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center px-8 py-12 sm:px-14">
                  <p className={eyebrow}>הסיפור האישי</p>
                  <h2 className="mb-6 text-2xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                    אני אוטיסט. ובמשך רוב החיים ניסיתי להסתיר את זה.
                  </h2>
                  <div className={`space-y-4 ${prose}`}>
                    <p>
                      לא מתוך בושה בלבד - אלא מתחושה שצריך לעבור לידו בשקט, לא להבליט, לא לתת לו להגדיר אותי.
                    </p>
                    <p>
                      ואז הגיע ריב עם חבר קרוב, שהשתמש באוטיזם שלי כדי להקטין אותי ולבטל את מה שאני אומר. זה הכעיס אותי כל כך שהעליתי סרטון אחד שמסביר על אוטיזם. לא מתוך אסטרטגיה, ולא מתוך רצון לפתוח קו תוכן חדש. פשוט כי נמאס לי לשתוק.
                    </p>
                    <p className="text-base font-bold text-[var(--color-text-primary)]">
                      הסרטון הגיע ליותר מ-300 אלף צפיות.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 7. Impact */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-8 py-12 sm:px-14`}>
              <p className={eyebrow}>ההשפעה</p>
              <h2 className="mb-8 text-2xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                מה שבאמת שינה את התמונה לא היה המספר - אלא התגובה האנושית.
              </h2>
              <div className={`max-w-2xl space-y-5 ${prose}`}>
                <p>
                  פתאום הגיעו שאלות מהורים, מאחים, מאנשים על הרצף, ומאנשים שפשוט פתאום הצליחו להבין את עצמם טוב יותר. הרבה מהם ביקשו שאמשיך.
                </p>
                <p>
                  אז המשכתי. לא כי רציתי להפוך ל״מסביר אוטיזם״, אלא כי הבנתי שיש כאן ערך אמיתי. שאם כל החיים הרגשתי שאני סוחב משקולת - אולי אפשר להפוך אותה למשהו שעוזר לעוד אנשים להרגיש פחות לבד.
                </p>
              </div>
            </div>
          </AnimatedEntry>

          {/* 8. Today */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-8 py-12 sm:px-14`}>
              <p className={eyebrow}>היום</p>
              <h2 className="mb-8 text-2xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                Apple, טכנולוגיה, אוטיזם - חלק מאותה שאלה.
              </h2>
              <div className={`max-w-2xl space-y-5 ${prose}`}>
                <p>
                  כל מה שאני עושה יושב על אותו חיבור. Apple, טכנולוגיה, בינה מלאכותית, פסיכולוגיה, שיווק, אינטרנט, אוטיזם, וזהות. על פניו אלה עולמות שונים. בפועל, מבחינתי, הם כולם חלק מאותה שאלה: איך דברים עובדים, ואיך הם פוגשים בני אדם.
                </p>
                <p>
                  אני אוהב לקחת נושאים מורכבים ולהפוך אותם לברורים. לא רק כדי להסביר - אלא כדי לעשות סדר, לתת שפה, ולייצר הבנה.
                </p>
                <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                  ואם קראתם עד כאן - אני רוצה להודות לכם על זה. כל הילדות שלי הייתי בטוח שאף אחד, אף פעם לא יקשיב לי. קיצר שימו עוקב.
                </p>
              </div>
            </div>
          </AnimatedEntry>

          {/* 9. Social CTA */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-8 py-12 text-center`}>
              <h2 className="text-2xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-3xl">בואו נהיה בקשר</h2>
              <p className="mt-3 text-lg text-[var(--color-text-secondary)]">עקבו אחריי ותישארו מעודכנים</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {siteConfig.socialLinks.map((link) => {
                  const style = SOCIAL_COLORS[link.platform];
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.05] hover:shadow-lg ${style?.bg ?? "bg-gray-800"}`}
                    >
                      {style?.label ?? link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </AnimatedEntry>

        </div>
      </main>

      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

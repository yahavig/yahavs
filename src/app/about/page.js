import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import { getSiteConfig } from "@/lib/content";
import {
  Sparkles, BookOpen, Brain, MessageCircle, Wifi, Smile,
} from "lucide-react";

export async function generateMetadata() {
  return {
    title: "עליי | yahav's",
    description: "נעים מאוד, יהב. יכול להיות שנתקלתם בתוכן שלי.",
  };
}

/* ─── Exact gradients from the home-page carousel ─────────────── */
const G = {
  dark:   "linear-gradient(145deg, #1C1C1E 0%, #38383A 100%)",
  orange: "linear-gradient(145deg, #FF9500 0%, #FFCC02 100%)",
  purple: "linear-gradient(145deg, #AF52DE 0%, #FF2D55 100%)",
  green:  "linear-gradient(145deg, #34C759 0%, #00C7BE 100%)",
  blue:   "linear-gradient(145deg, #5AC8FA 0%, #0071E3 100%)",
  red:    "linear-gradient(145deg, #FF6B6B 0%, #FF9500 100%)",
};

const card  = "rounded-3xl overflow-hidden shadow-[0_2px_24px_rgba(0,0,0,0.12)]";
const prose = "text-lg leading-loose text-white/90";
const h2cls = "font-bold tracking-tight text-white";

/* White icon — same style as the home carousel */
function CardIcon({ icon: Icon }) {
  return (
    <Icon
      size={48}
      color="white"
      strokeWidth={1.25}
      aria-hidden="true"
      style={{ opacity: 0.85 }}
    />
  );
}

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <Header navItems={siteConfig.navItems} />

      <main id="main-content" className="flex-1 bg-[var(--color-bg)]">

        {/* Page header */}
        <div className="pt-28 pb-8 px-8 sm:px-14">
          <AnimatedEntry>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight text-[var(--color-text-primary)]">
              עליי
            </h1>
          </AnimatedEntry>
        </div>

        <div className="space-y-3 p-3 sm:space-y-4 sm:p-4">

          {/* 1. Intro — Sparkles / dark */}
          <AnimatedEntry>
            <div className={card} style={{ background: G.dark }}>
              <div className="grid md:grid-cols-2">
                <div className="relative min-h-[380px] md:min-h-[500px] overflow-hidden">
                  <Image
                    src="/images/images/הירו1.jpeg"
                    alt="יהב גואטה"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center px-8 py-12 sm:px-14 gap-5">
                  <CardIcon icon={Sparkles} />
                  <h2 className={`text-4xl leading-[1.1] sm:text-5xl ${h2cls}`}>
                    נעים מאוד,<br />יהב.
                  </h2>
                  <div className={`space-y-4 ${prose}`}>
                    <p>
                      וואלה יש מצב שנתקלתם בתוכן שלי, או באיזה פרסומת של iDigital שבה אני מופיע. ולי זה ממש מוזר - לא חשבתי שאי פעם בכלל יקשיבו לי.
                    </p>
                    <p>
                      אבל שנייה לפני שאתם נכנסים לעמוד הזה - אני רוצה שתכירו אותי קצת יותר טוב.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 2. Childhood & tech — Wifi / blue */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-8 py-12 sm:px-14`} style={{ background: G.blue }}>
              <div className="flex flex-col gap-5">
                <CardIcon icon={Wifi} />
                <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
                  מאז שהייתי ילד, נמשכתי לטכנולוגיה כמעט בצורה אינסטינקטיבית.
                </h2>
                <div className={`max-w-2xl space-y-5 ${prose}`}>
                  <p>
                    אהבתי מחשבים, פירקתי והרכבתי כמעט כל מוצר חשמלי שהגיע אליי לידיים, וסיקרן אותי להבין לא רק איך דברים עובדים - אלא למה הם בנויים כמו שהם בנויים.
                  </p>
                  <p>
                    בדיעבד, אני חושב שזה היה גם המקום שבו מצאתי סדר. מסגרות אנושיות היו לי הרבה פחות פשוטות. היה לי קשה להשתלב, להבין קודים חברתיים, ולהרגיש טבעי. ותמיד ריתקו אותי הדרכים שבהן בני אדם מתקשרים - גם כי זה הגיע לי פחות טבעי מאחרים.
                  </p>
                  <p>
                    אולי בגלל זה התחברתי כל כך למכונות: הן היו ברורות, עקביות, הגיוניות. וכשמבינים אותן - הן לא שופטות אותך.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 3. iDigital — BookOpen / orange */}
          <AnimatedEntry delay={0.05}>
            <div className={card} style={{ background: G.orange }}>
              <div className="grid md:grid-cols-2">
                <div className="flex flex-col justify-center px-8 py-12 sm:px-14 gap-5">
                  <CardIcon icon={BookOpen} />
                  <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
                    iDigital, ניהול, ואז מול מצלמה.
                  </h2>
                  <div className={`space-y-4 ${prose}`}>
                    <p>
                      זה התחיל בכלל מזה שנמאס לי לעזור לחברים בטלפון בתור מנהל ב-iDigital, אז התחלתי להכין מדריכים ברורים על Apple.
                    </p>
                    <p>
                      הדרך המקצועית שלי התחילה שם. עבדתי עם מוצרי Apple ביום יום, התקדמתי לתפקיד ניהולי תחת סמנכ״ל, והבנתי שאני לא רק אוהב טכנולוגיה - אני אוהב לתווך אותה.
                    </p>
                    <p>
                      להסביר, לפשט, ולתרגם אותה למשהו שאנשים באמת יכולים להבין.
                    </p>
                  </div>
                </div>
                <div className="relative min-h-[340px] overflow-hidden">
                  <Image
                    src="/images/images/IMG_4377-בר אילן.jpeg"
                    alt="יהב בסטודיו"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 4. Content creation — Smile / red-orange */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-8 py-12 sm:px-14`} style={{ background: G.red }}>
              <div className="flex flex-col gap-5">
                <CardIcon icon={Smile} />
                <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
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
                    שירות, פתרון בעיות, הכוונה מצד אחד. תוכן, מסר, נוכחות מצד שני. שם הבנתי שזה לא ״או זה או זה״ - זה בדיוק שניהם.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 5. Bar-Ilan — MessageCircle / green */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-8 py-12 sm:px-14`} style={{ background: G.green }}>
              <div className="flex flex-col gap-5">
                <CardIcon icon={MessageCircle} />
                <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
                  אנחנו חיים בתקופה הראשונה בהיסטוריה שבה כמעט כל בני האדם מחוברים לאותו מרחב, בזמן אמת.
                </h2>
                <div className={`max-w-2xl space-y-5 ${prose}`}>
                  <p>
                    לא בגלל שבינה מלאכותית נכנסה לחיים שלנו - אלא בגלל ששינוי הרבה יותר עמוק קורה: שינוי באופן שבו בני אדם חושבים, מרגישים, לומדים, מחפשים משמעות, ובונים זהות דרך מידע.
                  </p>
                  <p>
                    בגלל זה בחרתי ללמוד מדעי המידע ויישומי בינה מלאכותית בבר-אילן. לא רק טכנולוגיה - אלא גם: איך אנשים מחפשים מידע, איך נבנית סמכות בעולם מוצף תוכן, ומה אלגוריתמים עושים לקשב שלנו.
                  </p>
                  <p>
                    מבחינתי אלה כלים להבין את המציאות שאנחנו כבר חיים בתוכה.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 6. Autism — Brain / purple-pink */}
          <AnimatedEntry delay={0.05}>
            <div className={card} style={{ background: G.purple }}>
              <div className="grid md:grid-cols-2">
                <div className="relative min-h-[380px] overflow-hidden">
                  <Image
                    src="/images/images/פריז-019-scaled.jpg"
                    alt="יהב ילד ליד מגדל אייפל"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center px-8 py-12 sm:px-14 gap-5">
                  <CardIcon icon={Brain} />
                  <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
                    אני אוטיסט. ובמשך רוב החיים ניסיתי להסתיר את זה.
                  </h2>
                  <div className={`space-y-4 ${prose}`}>
                    <p>
                      משם, בלי שתכננתי, אנשים התחילו לרצות לשמוע ממני גם על אוטיזם - דווקא על הדבר שניסיתי להסתיר כל החיים.
                    </p>
                    <p>
                      זה קרה אחרי ריב עם חבר קרוב, שהשתמש באוטיזם שלי כדי להקטין אותי. זה הכעיס אותי כל כך שהעליתי סרטון אחד שמסביר על אוטיזם - לא מתוך אסטרטגיה, פשוט כי נמאס לי לשתוק.
                    </p>
                    <p className="font-bold text-white">
                      הסרטון הגיע ליותר מ-300 אלף צפיות.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 7. Impact — Sparkles / dark */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-8 py-12 sm:px-14`} style={{ background: G.dark }}>
              <div className="flex flex-col gap-5">
                <CardIcon icon={Sparkles} />
                <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
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
            </div>
          </AnimatedEntry>

          {/* 8. Today — Wifi / blue */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-8 py-12 sm:px-14`} style={{ background: G.blue }}>
              <div className="flex flex-col gap-5">
                <CardIcon icon={Wifi} />
                <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
                  Apple, טכנולוגיה, אוטיזם - חלק מאותה שאלה.
                </h2>
                <div className={`max-w-2xl space-y-5 ${prose}`}>
                  <p>
                    כל מה שאני עושה יושב על אותו חיבור. Apple, טכנולוגיה, בינה מלאכותית, פסיכולוגיה, אינטרנט, אוטיזם, וזהות. על פניו אלה עולמות שונים. בפועל, מבחינתי, הם כולם חלק מאותה שאלה: איך דברים עובדים, ואיך הם פוגשים בני אדם.
                  </p>
                  <p>
                    אני אוהב לקחת נושאים מורכבים ולהפוך אותם לברורים. לא רק כדי להסביר - אלא כדי לעשות סדר, לתת שפה, ולייצר הבנה.
                  </p>
                  <p className="font-semibold text-white">
                    ואם קראתם עד כאן - אני רוצה להודות לכם על זה. כל הילדות שלי הייתי בטוח שאף אחד, אף פעם לא יקשיב לי. קיצר שימו עוקב.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedEntry>

        </div>
      </main>

      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

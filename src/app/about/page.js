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
    title: "עליי | yahavguetta.com",
    description: "נעים מאוד, יהב. יכול להיות שנתקלתם בתוכן שלי.",
  };
}

const card  = "rounded-3xl overflow-hidden glass-strong";
const prose = "text-sm leading-relaxed text-white/80";
const h2cls = "font-bold tracking-tight text-white";

/* Glass colour presets — CSS variable overrides applied via style prop */
const darkGlass = {
  "--glass-bg-strong":     "linear-gradient(145deg, rgba(28,28,30,0.90) 0%, rgba(56,56,58,0.90) 100%)",
  "--glass-border-strong": "rgba(255,255,255,0.12)",
  "--glass-shadow-lg":     "0 20px 60px rgba(0,0,0,0.40), 0 1px 0 rgba(255,255,255,0.10) inset",
};
const blueGlass = {
  "--glass-bg-strong":     "linear-gradient(145deg, rgba(90,200,250,0.48) 0%, rgba(0,113,227,0.54) 100%)",
  "--glass-border-strong": "rgba(90,200,250,0.32)",
  "--glass-shadow-lg":     "0 20px 60px rgba(0,113,227,0.30), 0 1px 0 rgba(255,255,255,0.22) inset",
};
const orangeGlass = {
  "--glass-bg-strong":     "linear-gradient(145deg, rgba(255,149,0,0.54) 0%, rgba(255,204,2,0.50) 100%)",
  "--glass-border-strong": "rgba(255,200,0,0.35)",
  "--glass-shadow-lg":     "0 20px 60px rgba(255,149,0,0.30), 0 1px 0 rgba(255,255,255,0.22) inset",
};
const redGlass = {
  "--glass-bg-strong":     "linear-gradient(145deg, rgba(255,107,107,0.54) 0%, rgba(255,149,0,0.50) 100%)",
  "--glass-border-strong": "rgba(255,120,80,0.35)",
  "--glass-shadow-lg":     "0 20px 60px rgba(255,107,107,0.30), 0 1px 0 rgba(255,255,255,0.22) inset",
};
const greenGlass = {
  "--glass-bg-strong":     "linear-gradient(145deg, rgba(52,199,89,0.52) 0%, rgba(0,199,190,0.50) 100%)",
  "--glass-border-strong": "rgba(52,199,89,0.32)",
  "--glass-shadow-lg":     "0 20px 60px rgba(52,199,89,0.26), 0 1px 0 rgba(255,255,255,0.22) inset",
};
const purpleGlass = {
  "--glass-bg-strong":     "linear-gradient(145deg, rgba(175,82,222,0.54) 0%, rgba(255,45,85,0.50) 100%)",
  "--glass-border-strong": "rgba(175,82,222,0.35)",
  "--glass-shadow-lg":     "0 20px 60px rgba(175,82,222,0.30), 0 1px 0 rgba(255,255,255,0.22) inset",
};

/* Icon — always white on coloured/dark glass */
function CardIcon({ icon: Icon }) {
  return (
    <Icon
      size={38}
      strokeWidth={1.25}
      aria-hidden="true"
      className="text-white/85"
      style={{ opacity: 0.9 }}
    />
  );
}

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <Header navItems={siteConfig.navItems} />

      <main id="main-content" className="flex-1">

        {/* Page header */}
        <div className="pt-16 pb-3 px-5 sm:px-10">
          <AnimatedEntry>
            <h1 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
              עליי
            </h1>
          </AnimatedEntry>
        </div>

        <div className="space-y-4 p-3 sm:space-y-4 sm:p-4">

          {/* 1. Intro — hero card, dark glass (matches Sparkles carousel card) */}
          <AnimatedEntry>
            <div className={card} style={darkGlass}>
              <div className="flex flex-col">
                <div className="flex flex-col justify-center px-5 py-6 sm:px-10 gap-4">
                  <CardIcon icon={Sparkles} />
                  <h2 className="text-3xl leading-[1.1] sm:text-4xl font-bold tracking-tight text-white">
                    נעים מאוד,<br />יהב.
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed text-white/80">
                    <p>
                      וואלה יש מצב שנתקלתם בתוכן שלי, או באיזה פרסומת של iDigital שבה אני מופיע. ולי זה ממש מוזר - לא חשבתי שאי פעם בכלל יקשיבו לי.
                    </p>
                    <p>
                      אבל שנייה לפני שאתם נכנסים לעמוד הזה - אני רוצה שתכירו אותי קצת יותר טוב.
                    </p>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <Image
                    src="/images/images/הירו2.png"
                    alt="יהב גואטה"
                    width={1200}
                    height={900}
                    className="w-full h-auto"
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 2. Childhood & tech — Wifi / blue */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-5 py-6 sm:px-8`} style={blueGlass}>
              <div className="flex flex-col gap-3">
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
            <div className={card} style={orangeGlass}>
              <div className="flex flex-col">
                <div className="flex flex-col justify-center px-5 py-6 sm:px-8 gap-3">
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
                <div className="overflow-hidden">
                  <Image
                    src="/images/images/IMG_4377-בר אילן.jpeg"
                    alt="יהב בסטודיו"
                    width={1200}
                    height={900}
                    className="w-full h-auto"
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 4. Content creation — Smile / red-orange */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-5 py-6 sm:px-8`} style={redGlass}>
              <div className="flex flex-col gap-3">
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
            <div className={`${card} px-5 py-6 sm:px-8`} style={greenGlass}>
              <div className="flex flex-col gap-3">
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
            <div className={card} style={purpleGlass}>
              <div className="flex flex-col">
                <div className="flex flex-col justify-center px-5 py-6 sm:px-8 gap-3">
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
                <div className="overflow-hidden">
                  <Image
                    src="/images/images/פריז-019-scaled.jpg"
                    alt="יהב ילד ליד מגדל אייפל"
                    width={1200}
                    height={900}
                    className="w-full h-auto"
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 7. Impact — Sparkles / dark */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-5 py-6 sm:px-8`} style={darkGlass}>
              <div className="flex flex-col gap-3">
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
            <div className={`${card} px-5 py-6 sm:px-8`} style={blueGlass}>
              <div className="flex flex-col gap-3">
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

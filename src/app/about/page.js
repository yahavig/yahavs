import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import { getSiteConfig } from "@/lib/content";

export async function generateMetadata() {
  return {
    title: "עליי | yahavguetta.com",
    description: "נעים מאוד, אני יהב. ואת זה לא כתבתי עם AI.",
  };
}

const card  = "rounded-3xl overflow-hidden glass-strong";
const prose = "text-sm leading-relaxed text-white/80";
const h2cls = "font-bold tracking-tight text-white";

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

const ICON_SIZES = {
  "/icons/6i.png":        58,
  "/icons/5globe.png":    52,
  "/icons/2book.png":     52,
  "/icons/6question.png": 54,
  "/icons/4message.png":  54,
  "/icons/1atom.png":     66,
};

function CardIcon({ src }) {
  const s = ICON_SIZES[src] ?? 56;
  return (
    <div style={{ width: s, height: s, alignSelf: "center" }} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.9, filter: "brightness(0) invert(1)" }} />
    </div>
  );
}

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <Header navItems={siteConfig.navItems} />

      <main id="main-content" className="flex-1">

        <div className="pt-16 pb-3 px-5 sm:px-10">
          <AnimatedEntry>
            <h1 className="text-[clamp(3.6rem,8vw,7rem)] font-bold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
              עליי
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/75">זה הסיפור בגדול:</p>
          </AnimatedEntry>
        </div>

        <div className="space-y-4 p-3 sm:space-y-4 sm:p-4">

          {/* 1 */}
          <AnimatedEntry>
            <div className={`${card} px-5 py-6 sm:px-10`} style={darkGlass}>
              <div className="flex flex-col gap-4">
                <CardIcon src="/icons/6i.png" />
                <h2 className="text-3xl leading-[1.1] sm:text-4xl font-bold tracking-tight text-white">
                  נעים מאוד, יהב.
                </h2>
                <p className="text-base font-semibold text-white/70">ואת כל זה לא כתבתי עם AI.</p>
                <div className="space-y-4 text-sm leading-relaxed text-white/80">
                  <p>
                    יכול להיות שנתקלתם בתוכן שלי. זה התחיל בכלל מזה שנמאס לי לעזור לכל מיני אנשים שלא שמעתי מהם שנים כשהייתי מנהל ב-iDigital, אז התחלתי להכין מדריכים ברורים על Apple. ואז באמת בלי שתכננתי, אנשים התחילו לרצות לשמוע ממני גם על אוטיזם - שזה דווקא  דבר שניסיתי להסתיר כל החיים. ככזה, תמיד ריתקו אותי הדרכים שבהן בני אדם מתקשרים וכשחושבים על זה, אנחנו חיים בתקופה הראשונה בהיסטוריה שבה כמעט כל בני האדם מחוברים לאותו מרחב, בזמן אמת. אבל שניה לפני זה, אני רוצה שנכיר קצת יותר טוב…
                  </p>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 2 */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-5 py-6 sm:px-8`} style={blueGlass}>
              <div className="flex flex-col gap-3">
                <CardIcon src="/icons/5globe.png" />
                <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
                  ילד עם מברג ושאלות.
                </h2>
                <div className={`max-w-2xl space-y-5 ${prose}`}>
                  <p>
                    מאז שהייתי ילד, נמשכתי לטכנולוגיה כמעט בצורה אינסטינקטיבית. אהבתי מחשבים, פירקתי והרכבתי כמעט כל מוצר חשמלי שהגיע אליי לידיים. מצאתי נחמה גדולה בלהבין איך העולם שלנו עובד ובנוי - בין אם זה מדברים כמו חלל וכימיה ובין אם זה כלים או מוצרים שיש סביבי (יעני טכנולוגיה). סיקרן אותי להבין גם איך הם עובדים - אבל גם למה הם בנויים כמו שהם בנויים.
                  </p>
                  <p>
                    בדיעבד, אני חושב שזה היה גם המקום שבו מצאתי סדר. מסגרות אנושיות היו לי הרבה יותר מסובכות ואמורפיות. היה לי קשה להשתלב, להבין קודים חברתיים, ולהרגיש טבעי בתוך העולם של כולם. היום אני יודע שלזה היה קשר גם לאוטיזם, אבל אז פשוט הרגשתי שאני איכשהו קורא את העולם בשפה קצת אחרת.
                  </p>
                  <p>
                    וכנראה בגלל זה התחברתי כל כך למחשבים וזה: הם היו ברורים, עקביים, הגיוניים וניתנים לחיזוי. אחלה.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 3 */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-5 py-6 sm:px-8`} style={orangeGlass}>
              <div className="flex flex-col gap-3">
                <CardIcon src="/icons/2book.png" />
                <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
                  iDigital. שם הבנתי מה אני.
                </h2>
                <div className={`space-y-4 ${prose}`}>
                  <p>
                    אחר כך סיימתי תיכון, עם לקויות למידה שזה נראה לי בגלל הקשב וריכוז המשוגע שלי - כחלק מהמכלול אני גם אוטודידקט ולומד בעצמי (כמעט) את כל מה שאני יודע.
                  </p>
                  <p>
                    אז, הדרך המקצועית שלי התחילה ב-iDigital. עבדתי עם לקוחות בחנות בהתחלה (בגלל שזה ממש עזר לי להקשיח את היכולות החברתיות שלי), צברתי היכרות עמוקה עם העולם הזה (שגם ככה אהבתי,  - Apple), והתקדמתי בתקופת הקורונה לתפקיד ניהולי תחת סמנכ"ל. זאת הייתה תקופה אינטנסיבית, עם הרבה אחריות, קצב גבוה וצורך ביכולת לקבל החלטות מהר. היה כיף אבל גם סבלתי קצת. אוקיי הרבה.
                  </p>
                  <p>
                    היא גם חידדה לי משהו חשוב על עצמי: אני לא רק ״אוהב טכנולוגיה״ - אני אוהב לתווך אותה. להסביר, לפשט, ולתרגם אותה למשהו שאנשים באמת יכולים להבין ולהרגיש בנוח איתו. קצת כמו שהייתי רוצה שיסבירו לי על תקשורת בין אישית (חכו, עוד נגיע לזה)…
                  </p>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 4 */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-5 py-6 sm:px-8`} style={redGlass}>
              <div className="flex flex-col gap-3">
                <CardIcon src="/icons/6question.png" />
                <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
                  וככה התחלתי לייצר תוכן.
                </h2>
                <div className={`max-w-2xl space-y-5 ${prose}`}>
                  <p>
                    כשהתחלתי את התואר, התחלתי גם ליצור מדריכים קצרים על מוצרי Apple, והסיבה לזה היתה פשוטה: נמאס היה לי לשבת חצי שעה על שיחת טלפון עם איזה מישהו מהכיתה בחטיבה רק כדי להסביר משהו שאפשר היה לפתור בדקה אם הייתי לידו. מבחינתי, אם היה קיים מדריך קצר, ברור ומדויק, גם הוא היה מקבל תשובה יותר טובה וגם אני הייתי חוסך את כל החצי שעה הזאת (שבסופה הוא גם ככה היה אומר לי שהוא כבר ילך לחנות לעשות את זה).
                  </p>
                  <p>
                    אז התחלתי להכין מדריכים כאלה בעצמי, ובבום של ממש הם התחילו לתפוס בטיקטוק (העלתי לשם כי החברים שלי לא יראו את זה, וזאת פלטפורמה די נפוצה אז אפשר לשתף משם קישורים). פתאום גיליתי שיש לי לא רק ידע, אלא יכולת לעזור לאנשים (ממממ בעצם די ידעתי את זה). ז״א אני יודע לקחת נושא טכני, לפרק אותו, ולהגיש אותו בצורה שאנשים באמת רוצים לצרוך.
                  </p>
                  <p>
                    תראו, תמיד היו לי חברים יוטיוברים (די גדולים שאתם בטוח מכירים) והייתי הולך איתם לכנסים. תמיד הייתי חלק מהעולם הזה אבל כחבר של. נורא קינאתי מצד אחד - אבל לא באמת יכלתי לעשות את זה. פשוט פחדתי. אז כשהסרטונים האלה הצליחו בטיקטוק - פתאום הרגשתי משהו. סוג של, החמצה, חסך כזה. כאילו זה תמיד היה לי מתחת לאף. תמיד יכלתי  גם אני להיות חלק מ... אז יאללה. יש לי תחביב חדש.
                  </p>
                  <p>
                    בהמשך התחלתי את התואר הראשון וחזרתי לעבוד בחנויות כאקספרט (מה שהיה כל כך טבעי ונוח כי כבר ניהלתי הרבה מעל התפקיד הזה) ובמקביל גם התחלתי להצטלם לסרטונים של iDigital מה שהיה ממש טבעי כי כבר אנשים מכירים אותי מהטיקטוק - לייצר תוכן עבור הרשתות החברתיות של החברה. החיבור הזה, בין העבודה עם אנשים בשטח לבין עמידה מול מצלמה, הרגיש לי טבעי באופן כמעט מוזר (אבל גם מוזר באופן מוזר חח). מצד אחד שירות, פתרון בעיות והכוונה. מצד שני תוכן, מסר, נוכחות, ויכולת לגעת באנשים דרך מסך. שם הבנתי שזה לא "או זה או זה". זה בדיוק שניהם.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 5 */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-5 py-6 sm:px-8`} style={greenGlass}>
              <div className="flex flex-col gap-3">
                <CardIcon src="/icons/4message.png" />
                <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
                  התקופה הכי מרגשת בהיסטוריה.
                </h2>
                <div className={`max-w-2xl space-y-5 ${prose}`}>
                  <p>
                    ועכשיו לחלק הבאמת מעניין - אני חושב שאנחנו חיים בתקופה הכי מרגשת בתולדות האנושות. לא בגלל שבינה מלאכותית נכנסה לחיים שלנו, ולא  בגלל שהמכשירים נהיו חכמים יותר ובכל מקום (מה זה מקרר חכם באמאשלכם?), אלא בגלל שאנחנו בעיצומו של שינוי הרבה יותר עמוק: הדרך בה אנחנו מתקשרים. עידן חדש לגמרי לאנושות.
                  </p>
                  <p>
                    הכל מהיר יותר: באופן שבו בני אדם חושבים, מרגישים, לומדים, מחפשים משמעות, ובונים זהות דרך מידע. האינטרנט הוא כבר מזמן לא רק מקום שנכנסים אליו. הוא סביבה, שפה, ומבחינות רבות גם ׳מערכת ההפעלה׳ של התודעה המודרנית (מה שקורה נגיד עם הדעה על ישראל בעולם, לדוגמה..). האינפלציה של המידע, הרשתות החברתיות, האלגוריתמים ששולטים בנו ובתוכן שאנחנו צורכים, המעבר מהקשר לקשב ומהיגיון להשפעה - כל אלה שינו לגמרי את הדרך שבה אנחנו חיים.
                  </p>
                  <p>
                    בגלל זה בחרתי ללמוד בדיוק את התחום הזה, כרגע אני עושה גם תואר שני, ובהמשך מקווה לדוקטורט, דווקא מהכיוון החברתי, האנושי והפסיכולוגי של העולם החדש שנוצר כאן (אירוני לילד אוטיסט חסר חברים, הא..).
                  </p>
                  <p>
                    בדיוק מהמקום הזה אני לומד באוניברסיטת בר אילן - מדעי המידע ויישומי בינה מלאכותית. מה ש(ממש )מושך אותי בתחום הוא העובדה שהוא לא עוסק רק ב׳טכנולוגיה עצמה(אבל בעיקר כן), הוא עוסק גם באופן שבו בני אדם פוגשים אותה. כן, גם במידע, באינטרנט, בקוד ובבינה מלאכותית (למידת מכונה, רשתות ניורונים וכזה), אבל גם בשאלות כמו איך אנשים מחפשים מידע, איך הם מפרשים אותו, איך נבנית סמכות בעולם מוצף תוכן, מה אלגוריתמים עושים לקשב שלנו, איך נוצרת שפה חדשה ברשת, ואיך חוויה דיגיטלית משנה התנהגות. שם גם פגשתי מושגים כמו ארגון מידע, התנהגות מידע, חיפוש ואחזור, חוויית משתמש, הטרוגניות של מידע, Linked Data, והמעבר מ-Web 1.0 ל-Web 2.0, Web 3.0 ובלה בלה בלה אני מתחיל להישמע כמו צ׳אט גי פי טי 3.2…
                  </p>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 6 */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-5 py-6 sm:px-8`} style={purpleGlass}>
              <div className="flex flex-col gap-3">
                <CardIcon src="/icons/1atom.png" />
                <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
                  אני אוטיסט.
                </h2>
                <div className={`space-y-4 ${prose}`}>
                  <p>
                    באיזשהו שלב, התוכן שלי התחיל לזוז גם למקום אישי יותר. באמת שלא מתוך תכנון, אלא כי החיים דחפו אותי לשם. אני אוטיסט (אחו*****), ובמשך רוב החיים שלי, לג׳יט ניסיתי להסתיר את זה. לרכך את זה (מאסקינג) ולהחזיק את עצמי בצורה שתהיה יותר קלה ׳לעיכול׳ עבור הסביבה.
                  </p>
                  <p>
                    ואז הגיע ריב עם חבר קרוב מאוד שלי, שהשתמש באוטיזם שלי כדי להקטין אותי ולבטל את מה שאני אומר (המשפט היה: ״אני לא מצפה ממך להבין את זה״). זה הכעיס. זה גרם לי להתחרפן. זה דחף אותי לפתוח מצלמה ולצלם סרטון אחד שמסביר על אוטיזם. לא אסטרטגיה, לא לבכות אינטרנט לא יודע למה. רציתי שיבינו מה אני עובר ומה זה תכל׳ס.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 7 */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-5 py-6 sm:px-8`} style={darkGlass}>
              <div className="flex flex-col gap-3">
                <CardIcon src="/icons/6i.png" />
                <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
                  אני לא רוצה להיות ״האוטיסט מהטיקטוק״. ממש לא רוצה.
                </h2>
                <div className={`max-w-2xl space-y-5 ${prose}`}>
                  <p>
                    הסרטון הזה הגיע ליותר מ-300 אלף צפיות (הגעתי להרבה יותר גם בעבר וגם היום - אז אני באמת לא מתרגש מזה) אבל מה שבאמת שינה לי את התמונה היה התגובה האנושית שהוא יצר. פתאום הגיעו שאלות מהורים של, מאחים של, מורים של (ומ)אנשים על הרצף, וגם מאנשים שפשוט פתאום הצליחו להבין את עצמם טוב יותר. הרבה מהם ביקשו שאמשיך.
                  </p>
                  <p>
                    אז המשכתי. ממש לא רציתי להפוך ל״אוטיסט מהטיקטוק״, פשוט הבנתי שיש כאן ערך אמיתי. שאם כל החיים הרגשתי שאני סוחב משקולת, יכול להיות שאולי אפשר להפוך אותה למשהו שעוזר לאנשים כמוני להרגיש פחות לבד - או להקל עליהם. יום אחד אני אוציא ספר שאקרא לו המדריך לאוטיסט. יום אחד. עדין לא התחלתי לכתוב אותו.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* 8 */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-5 py-6 sm:px-8`} style={blueGlass}>
              <div className="flex flex-col gap-3">
                <CardIcon src="/icons/5globe.png" />
                <h2 className={`text-2xl sm:text-3xl ${h2cls}`}>
                  אבל בסוף - הכל חלק מאותה שאלה.
                </h2>
                <div className={`max-w-2xl space-y-5 ${prose}`}>
                  <p>
                    היום כל מה שאני עושה יושב על אותו קו נראה לי. Apple, בינה מלאכותית, פסיכולוגיה, שיווק, אינטרנט, אוטיזם ועוד כאלה דברים שנשמעים מפוצץ. על פניו אלה עולמות שונים. בפועל, מבחינתי, הם כולם חלק מאותה השאלה - איך דברים עובדים, ואיך הם פוגשים בני אדם.
                  </p>
                  <p className="font-semibold text-white">
                    אם קראתם עד כאן, אז אני רוצה להודות לכם על זה, כי כל הילדות שלי הייתי בטוח שאף אחד, אף פעם לא יקשיב לי.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedEntry>

          {/* Disclaimer */}
          <AnimatedEntry delay={0.05}>
            <div className={`${card} px-5 py-5 sm:px-8`} style={darkGlass}>
              <p className="text-xs leading-relaxed text-white/55">
                <strong className="text-white/70">לידיעה:</strong> תכנים העוסקים באוטיזם, חוויות אישיות או התמודדות נפשית באתר זה מבוססים על ניסיון אישי ותובנות כלליות בלבד. הם אינם מהווים ייעוץ רפואי, פסיכולוגי, טיפולי או אבחוני. בכל מקרה הדורש החלטה רפואית או טיפולית, מומלץ לפנות לאיש מקצוע מוסמך.
              </p>
            </div>
          </AnimatedEntry>

        </div>
      </main>

      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

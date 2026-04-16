import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about-preview">
      <div className="grid md:grid-cols-[2fr_3fr]">
        {/* Photo */}
        <div className="relative min-h-[300px] bg-[#1a1a1a] overflow-hidden">
          <Image
            src="/images/about-headshot.jpg"
            alt="יהב גואטה"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-8 py-10 sm:px-12">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.25em] text-[var(--color-text-tertiary)] uppercase">עליי</p>
          <h2 className="text-2xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
            נעים מאוד, יהב.
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.85] text-[var(--color-text-secondary)]">
            יכול להיות שנתקלתם בתוכן שלי. זה התחיל בכלל מזה שנמאס לי לעזור לחברים בטלפון בתור מנהל ב-iDigital, אז התחלתי להכין מדריכים ברורים על Apple. משם, בלי שתכננתי, אנשים התחילו לרצות לשמוע ממני גם על אוטיזם - דווקא על הדבר שניסיתי להסתיר כל החיים. וככזה, תמיד ריתקו אותי הדרכים שבהן בני אדם מתקשרים. וכשחושבים על זה, אנחנו חיים בתקופה הראשונה בהיסטוריה שבה כמעט כל בני האדם מחוברים לאותו מרחב, בזמן אמת. אבל שנייה לפני זה - אני רוצה שתכירו אותי קצת יותר טוב…
          </p>
          <div className="mt-7 flex justify-center">
            <Link
              href="/about"
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition-all duration-200 hover:scale-[1.04] hover:shadow-lg"
            >
              להמשך קריאה ←
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

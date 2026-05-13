import GlassButton from "@/components/ui/GlassButton";
import Carousel from "@/components/ui/Carousel";
import { ContainerScroll } from "@/components/ui/ContainerScroll";
import { Sparkles, BookOpen, Brain, MessageCircle, Wifi, Smile, ChevronLeft } from "lucide-react";

/* ─── Cards — one sentence each, uniform text size ─────────────── */
const CARDS = [
  {
    Icon: Sparkles,
    gradient: "linear-gradient(145deg, #1C1C1E 0%, #38383A 100%)",
    text: "וואלה יש מצב שנתקלתם בתוכן שלי, או באיזה פרסומת של iDigital שבה אני מופיע - ולי זה ממש מוזר. לא חשבתי שאי פעם בכלל יקשיבו לי...",
  },
  {
    Icon: BookOpen,
    gradient: "linear-gradient(145deg, #FF9500 0%, #FFCC02 100%)",
    text: "זה התחיל בכלל מזה שנמאס לי לעזור לחברים בטלפון בתור מנהל ב-iDigital, אז התחלתי להכין מדריכים ברורים על Apple.",
  },
  {
    Icon: Brain,
    gradient: "linear-gradient(145deg, #AF52DE 0%, #FF2D55 100%)",
    text: "משם, בלי שתכננתי, אנשים התחילו לרצות לשמוע ממני גם על אוטיזם. דווקא על הדבר שניסיתי להסתיר כל החיים.",
  },
  {
    Icon: MessageCircle,
    gradient: "linear-gradient(145deg, #34C759 0%, #00C7BE 100%)",
    text: "וככזה, תמיד ריתקו אותי הדרכים שבהן בני אדם מתקשרים.",
  },
  {
    Icon: Wifi,
    gradient: "linear-gradient(145deg, #5AC8FA 0%, #0071E3 100%)",
    text: "וכשחושבים על זה, אנחנו חיים בתקופה הראשונה בהיסטוריה שבה כמעט כל בני האדם מחוברים לאותו מרחב, בזמן אמת.",
  },
  {
    Icon: Smile,
    gradient: "linear-gradient(145deg, #FF6B6B 0%, #FF9500 100%)",
    text: "אבל שנייה לפני זה, אני רוצה שתכירו אותי קצת יותר טוב.",
  },
];

/* ─── Title shown above the card ───────────────────────────────── */
function SectionTitle() {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] sm:text-3xl">
        נעים מאוד, יהב.
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg leading-loose text-white/75">
        אני ממש שמח שאתם כאן, באמת. אם כבר נכנסתם לבדוק מי אני, מה אני עושה ולמה יש לי אתר כאילו אני מינימום מוסד תרבות עם תקציב - אפשר לעשות את זה כמו שצריך. כתבתי כאן את הסיפור המלא שלי, בהשקעה לא סבירה. או שתמשיכו לגלול כי אם כבר סטוקינג, לפחות שיהיה רב-ערוצי ומגובה במקורות.
      </p>
    </>
  );
}

/* ─── Main section ──────────────────────────────────────────────── */
export default function AboutSection() {
  return (
    <section id="about">
      <ContainerScroll titleComponent={<SectionTitle />}>

        {/* ── Outer glass card with Apple Intelligence aurora border ── */}
        <div className="relative rounded-3xl overflow-hidden glass-strong">

          {/* Aurora border — top */}
          <div aria-hidden="true" className="pointer-events-none absolute z-10 inset-x-0 top-0 h-6"
            style={{ background: "linear-gradient(to right, rgba(59,130,246,0.88) 0%, rgba(99,102,241,0.85) 33%, rgba(168,85,247,0.82) 66%, rgba(236,72,153,0.80) 100%)", maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)" }} />
          {/* Aurora border — right */}
          <div aria-hidden="true" className="pointer-events-none absolute z-10 inset-y-0 right-0 w-6"
            style={{ background: "linear-gradient(to bottom, rgba(236,72,153,0.80) 0%, rgba(239,68,68,0.82) 50%, rgba(249,115,22,0.85) 100%)", maskImage: "linear-gradient(to left, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 100%)" }} />
          {/* Aurora border — bottom */}
          <div aria-hidden="true" className="pointer-events-none absolute z-10 inset-x-0 bottom-0 h-6"
            style={{ background: "linear-gradient(to left, rgba(249,115,22,0.85) 0%, rgba(234,179,8,0.82) 100%)", maskImage: "linear-gradient(to top, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)" }} />
          {/* Aurora border — left */}
          <div aria-hidden="true" className="pointer-events-none absolute z-10 inset-y-0 left-0 w-6"
            style={{ background: "linear-gradient(to top, rgba(234,179,8,0.82) 0%, rgba(59,130,246,0.88) 100%)", maskImage: "linear-gradient(to right, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 100%)" }} />

          {/* ── Carousel ─────────────────────────────────────────── */}
          <div className="pt-10 pb-4">
            <Carousel stripClassName="ps-5 sm:ps-8 lg:ps-12 pe-5 sm:pe-8 lg:pe-12">
              {CARDS.map(({ Icon, gradient, text }, i) => (
                <div
                  key={i}
                  className="w-64 shrink-0 sm:w-72 rounded-3xl overflow-hidden select-none"
                  style={{ background: gradient, minHeight: "300px" }}
                >
                  <div className="flex flex-col p-7 gap-5" style={{ minHeight: "300px" }}>
                    <Icon size={48} color="white" strokeWidth={1.25} aria-hidden="true" style={{ opacity: 0.85 }} />
                    <p className="mt-10 text-white text-[0.9375rem] leading-[1.75] font-semibold">{text}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* ── CTA button ───────────────────────────────────────── */}
          <div className="flex justify-center pb-10 pt-2">
            <GlassButton
              href="/about"
              size="sm"
              aria-label="לעמוד עליי המלא"
              glassColor="rgba(0, 113, 227, 0.80)"
              className="text-white font-semibold"
            >
              <span>מי אתה, יהב גואטה?</span>
              <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
            </GlassButton>
          </div>

        </div>
      </ContainerScroll>
    </section>
  );
}

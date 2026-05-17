import GlassButton from "@/components/ui/GlassButton";
import Carousel from "@/components/ui/Carousel";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import { Sparkles, BookOpen, Brain, MessageCircle, Wifi, Smile, ChevronLeft } from "lucide-react";

const CARDS = [
  { Icon: Sparkles,      gradient: "linear-gradient(145deg, #1C1C1E 0%, #38383A 100%)", text: "יש מצב שנתקלתם בי בתוכן, בפרסומת של iDigital או סתם באינטרנט. אז כתבתי כאן את הסיפור המלא - בהשקעה קצת מוגזמת." },
  { Icon: BookOpen,      gradient: "linear-gradient(145deg, #FF9500 0%, #FFCC02 100%)", text: "זה התחיל בכלל מזה שנמאס לי לעזור לחברים בטלפון בתור מנהל ב-iDigital, אז התחלתי להכין מדריכים ברורים על Apple." },
  { Icon: Brain,         gradient: "linear-gradient(145deg, #AF52DE 0%, #FF2D55 100%)", text: "משם, בלי שתכננתי, אנשים התחילו לרצות לשמוע ממני גם על אוטיזם. דווקא על הדבר שניסיתי להסתיר כל החיים." },
  { Icon: MessageCircle, gradient: "linear-gradient(145deg, #34C759 0%, #00C7BE 100%)", text: "וככזה, תמיד ריתקו אותי הדרכים שבהן בני אדם מתקשרים." },
  { Icon: Wifi,          gradient: "linear-gradient(145deg, #5AC8FA 0%, #0071E3 100%)", text: "וכשחושבים על זה, אנחנו חיים בתקופה הראשונה בהיסטוריה שבה כמעט כל בני האדם מחוברים לאותו מרחב, בזמן אמת." },
  { Icon: Smile,         gradient: "linear-gradient(145deg, #FF6B6B 0%, #FF9500 100%)", text: "אבל שנייה לפני זה, אני רוצה שתכירו אותי קצת יותר טוב." },
];

const SHIMMER = "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 40%, transparent 100%)";
const TOP_HIGHLIGHT = "linear-gradient(to right, transparent, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.7) 70%, transparent) top/100% 1px no-repeat";
const CARD_BORDER = "1px solid rgba(255,255,255,0.28)";

export default function AboutSection() {
  return (
    <section id="about" className="pt-6 pb-3 sm:pt-9 sm:pb-4">
      <AnimatedEntry delay={0.1}>
        <Carousel className="-mx-3 sm:-mx-5" stripClassName="ps-3 sm:ps-5 pe-3 sm:pe-5">
          {CARDS.map(({ Icon, gradient, text }, i) => (
            <div
              key={i}
              className="w-56 shrink-0 sm:w-64 min-h-[210px] flex flex-col gap-4 p-5 rounded-2xl select-none"
              style={{
                background: `${TOP_HIGHLIGHT}, ${SHIMMER}, ${gradient}`,
                border: CARD_BORDER,
              }}
            >
              <Icon size={32} color="white" strokeWidth={1.4} aria-hidden="true" style={{ opacity: 0.9 }} />
              <p className="text-white text-sm leading-[1.75] font-semibold" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.18)" }}>
                {text}
              </p>
            </div>
          ))}
        </Carousel>
      </AnimatedEntry>

      <AnimatedEntry delay={0.18}>
        <div className="flex justify-center mt-5">
          <GlassButton href="/about" size="sm" aria-label="לעמוד עליי המלא" glassColor="rgba(0, 113, 227, 0.80)" className="text-white font-semibold">
            <span>מי אתה, יהב גואטה?</span>
            <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
          </GlassButton>
        </div>
      </AnimatedEntry>
    </section>
  );
}

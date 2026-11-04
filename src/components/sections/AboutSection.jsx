import GlassButton from "@/components/ui/GlassButton";
import Carousel from "@/components/ui/Carousel";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import Container from "@/components/ui/Container";
import LiquidCard from "@/components/ui/LiquidCard";
import { ChevronLeft } from "lucide-react";

const darkGlass = {
  "--glass-bg-strong":     "linear-gradient(145deg, rgba(28,28,30,0.90) 0%, rgba(56,56,58,0.90) 100%)",
  "--glass-border-strong": "rgba(255,255,255,0.12)",
  "--glass-shadow-lg":     "0 1px 0 rgba(255,255,255,0.10) inset",
};
const blueGlass = {
  "--glass-bg-strong":     "linear-gradient(145deg, rgba(90,200,250,0.48) 0%, rgba(0,113,227,0.54) 100%)",
  "--glass-border-strong": "rgba(90,200,250,0.32)",
  "--glass-shadow-lg":     "0 1px 0 rgba(255,255,255,0.22) inset",
};
const purpleGlass = {
  "--glass-bg-strong":     "linear-gradient(145deg, rgba(175,82,222,0.54) 0%, rgba(255,45,85,0.50) 100%)",
  "--glass-border-strong": "rgba(175,82,222,0.35)",
  "--glass-shadow-lg":     "0 1px 0 rgba(255,255,255,0.22) inset",
};
const greenGlass = {
  "--glass-bg-strong":     "linear-gradient(145deg, rgba(52,199,89,0.52) 0%, rgba(0,199,190,0.50) 100%)",
  "--glass-border-strong": "rgba(52,199,89,0.32)",
  "--glass-shadow-lg":     "0 1px 0 rgba(255,255,255,0.22) inset",
};
const orangeGlass = {
  "--glass-bg-strong":     "linear-gradient(145deg, rgba(255,149,0,0.54) 0%, rgba(255,204,2,0.50) 100%)",
  "--glass-border-strong": "rgba(255,200,0,0.35)",
  "--glass-shadow-lg":     "0 1px 0 rgba(255,255,255,0.22) inset",
};
const redGlass = {
  "--glass-bg-strong":     "linear-gradient(145deg, rgba(255,107,107,0.54) 0%, rgba(255,149,0,0.50) 100%)",
  "--glass-border-strong": "rgba(255,120,80,0.35)",
  "--glass-shadow-lg":     "0 1px 0 rgba(255,255,255,0.22) inset",
};

const CARDS = [
  { icon: "/icons/6i.png",       size: 58, glass: darkGlass,   text: "יש מצב שנתקלתם בי בטיקטוק, ביוטיוב, בפרסומת של iDigital או סתם בגלילת הפיד. אז הנה הסיפור המלא - עם השקעה קצת מוגזמת, כרגיל." },
  { icon: "/icons/2book.png",    size: 52, glass: blueGlass,   text: "אז זה התחיל מזה שנמאס לי לפתור לחברים בעיות Apple בטלפון. אז במקום לענות שוב ושוב על אותן שאלות, התחלתי להכין מדריכים קצרים וברורים והעלתי אותם לטיקטוק." },
  { icon: "/icons/1atom.png",    size: 66, glass: purpleGlass, text: "ואז, התחלתי לדבר על אוטיזם - כי מישהו עיצבן אותי ואנשים התחילו לרצות לשמוע ממני על זה. שזה מצחיק, כי זה בערך הדבר שניסיתי להסתיר כל החיים." },
  { icon: "/icons/4message.png", size: 54, glass: greenGlass,  text: "ככה, איכשהו, שני העולמות שלי התחברו לעמוד הזה: Apple מצד אחד, והתמודדות עם אוטיזם, ז״א הסברה על זה מצד שני." },
  { icon: "/icons/5globe.png",   size: 52, glass: orangeGlass, text: "עכשיו שמעו, אנחנו חיים בתקופה הכי מרגשת אי פעם ולא בגלל ה-AI: כמעט כל בני האדם בעולם מחוברים, בזמן אמת, ומעמידים פנים שזה נורמלי. זה לא." },
  { icon: "/icons/6question.png",size: 54, glass: redGlass,    text: "בדיוק על התואר הראשון והשני שלי, אבל לפני שאני נכנס לאינטרנט, אלגוריתמים, אוטיזם וכל שאר הדברים - בואו נתחיל רגע מהסיפור המלא… (ואת הכל אני כתבתי, לא ה-AI)" },
];

export default function AboutSection() {
  return (
    <LiquidCard>
    <section id="about" className="py-6 sm:py-9">
      <Container className="max-w-none!">
      <AnimatedEntry delay={0.05}>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl mb-2">נעים מאוד, יהב.</h2>
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-4 text-center">
          זה האתר שלי, אז טכנית מותר לי להתחיל בקצת יותר מדי מידע על עצמי.
        </p>
      </AnimatedEntry>
      <AnimatedEntry delay={0.1}>
        <Carousel className="bleed" stripClassName="gutter-strip">
          {CARDS.map(({ icon, size, glass, text }, i) => (
            <div
              key={i}
              className="glass-strong w-56 shrink-0 sm:w-64 min-h-[260px] flex flex-col gap-4 pt-7 pb-7 px-5 rounded-lg select-none"
              style={glass}
            >
              <div style={{ width: "100%", height: 70, display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon} alt="" style={{ width: size, height: size, objectFit: "contain", opacity: 0.9, filter: "brightness(0) invert(1)" }} />
              </div>
              <p className="text-white text-sm leading-[1.75] font-semibold" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.18)" }}>
                {text}
              </p>
            </div>
          ))}
        </Carousel>
      </AnimatedEntry>

      <AnimatedEntry delay={0.18}>
        <div id="about-cta" className="flex justify-center mt-5">
          <GlassButton href="/about" size="sm" aria-label="לעמוד עליי המלא" className="text-white font-semibold">
            <span>הסיפור שלי</span>
            <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
          </GlassButton>
        </div>
      </AnimatedEntry>
      </Container>
    </section>
    </LiquidCard>
  );
}

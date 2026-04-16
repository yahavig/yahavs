import Container from "@/components/ui/Container";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import Link from "next/link";

function firstSentence(text) {
  if (!text) return "";
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text.slice(0, 100) + "…";
}

export default function NewsPreview({ articles = [] }) {
  if (articles.length === 0) return null;
  const items = articles.slice(0, 7);

  return (
    <section id="news-preview" className="py-16 sm:py-24">
      <Container>
        <AnimatedEntry>
          <p className="mb-2 text-[11px] font-medium tracking-[0.25em] text-[var(--color-text-tertiary)] uppercase">חדשות</p>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">חדשות התפוח</h2>
        </AnimatedEntry>

        <div className="mt-8 flex flex-col divide-y divide-[var(--color-border-light)]">
          {items.map((item, i) => (
            <AnimatedEntry key={item.link} delay={i * 0.05}>
              <a href={item.link} target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-4 py-4 transition-colors hover:text-[var(--color-accent)]">
                <span className="mt-1 shrink-0 text-xs font-medium tabular-nums text-[var(--color-text-tertiary)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold leading-snug text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">
                    {item.titleHe || item.title}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)] line-clamp-1">
                    {firstSentence(item.excerptHe)}
                  </p>
                </div>
              </a>
            </AnimatedEntry>
          ))}
        </div>

        {/* Centered CTA */}
        <AnimatedEntry delay={0.3}>
          <div className="mt-8 flex justify-center">
            <Link
              href="/news"
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition-all duration-200 hover:scale-[1.04] hover:shadow-lg"
            >
              כל חדשות התפוח ←
            </Link>
          </div>
        </AnimatedEntry>
      </Container>
    </section>
  );
}

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/cards/ProductCard";
import ProductCarousel from "@/components/ui/ProductCarousel";
import { getSiteConfig } from "@/lib/content";
import { getShop } from "@/lib/shop";

export const metadata = {
  title: "חנות | yahavguetta.com",
  description: "מוצרים שאני אוהב, עם קישורים ישירים לאלי אקספרס.",
};

export default async function ShopPage() {
  const [siteConfig, { affiliate, groups }] = await Promise.all([getSiteConfig(), getShop()]);
  const showChips = groups.length > 1 && groups.every((g) => g.label);

  return (
    <>
      <Header navItems={siteConfig.navItems} />
      <main id="main-content" className="flex-1 pt-24 pb-16">
        <Container>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] sm:text-6xl">
            חנות
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-white/75">
            כל מה שאני משתמש בו, ממליץ עליו או סתם נתקעתי עליו בשתיים בלילה. הקישורים מובילים ישר לאלי אקספרס.
          </p>

          {affiliate && (
            <p className="mx-auto mb-8 max-w-2xl rounded-2xl glass px-5 py-3 text-xs leading-relaxed text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text-primary)]">גילוי נאות:</strong>{" "}
              הקישורים בעמוד הם קישורי שותפים. אם תרכשו דרכם אקבל עמלה קטנה, בלי תוספת מחיר עבורכם.{" "}
              <Link href="/terms" className="text-[var(--color-accent)] hover:underline">
                פרטים נוספים
              </Link>
            </p>
          )}

          {showChips && (
            <nav aria-label="קטגוריות" className="mb-10 flex flex-wrap items-center justify-center gap-2">
              {groups.map((g) => (
                <a
                  key={g.id}
                  href={`#cat-${g.id}`}
                  className="rounded-full glass px-4 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {g.label}
                </a>
              ))}
            </nav>
          )}

          {groups.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl glass-strong p-10">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">המדפים עוד ריקים</h2>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                אני מסדר פה מוצרים. תחזרו עוד קצת.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              {groups.map((g, gi) => (
                <section key={g.id} id={`cat-${g.id}`} aria-labelledby={g.label ? `h-${g.id}` : undefined} className="scroll-mt-24">
                  {g.label && (
                    <h2 id={`h-${g.id}`} className="mb-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {g.label}
                    </h2>
                  )}
                  <ProductCarousel label={g.label ?? "מוצרים"}>
                    {g.products.map((p, i) => (
                      <div key={p.url} className="w-[46%] shrink-0 snap-start sm:w-56 lg:w-60">
                        <ProductCard product={p} preload={gi === 0 && i < 4} />
                      </div>
                    ))}
                  </ProductCarousel>
                </section>
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

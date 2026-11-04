import { ChevronLeft } from "lucide-react";
import GlassButton from "@/components/ui/GlassButton";
import ProductCard from "@/components/cards/ProductCard";
import ProductCarousel from "@/components/ui/ProductCarousel";
import Container from "@/components/ui/Container";
import LiquidCard from "@/components/ui/LiquidCard";
import { getShop } from "@/lib/shop";

export default async function ShopSection() {
  const { featured } = await getShop();
  if (!featured.length) return null;

  return (
    <LiquidCard>
    <section id="shop" aria-labelledby="shop-heading" className="py-6 sm:py-9">
      <Container className="max-w-none!">
      <h2 id="shop-heading" className="mb-2 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
        חנות
      </h2>
      <p className="mx-auto mb-4 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
        מוצרים איכותיים בטירוף ברבע מהמחיר. בלי עמלות ובלי חרטא.
      </p>

      <ProductCarousel label="מוצרים נבחרים">
        {featured.map((p) => (
          <div key={p.url} className="w-[46%] shrink-0 snap-start sm:w-56 lg:w-60">
            <ProductCard product={p} />
          </div>
        ))}
      </ProductCarousel>

      <div className="mt-4 flex flex-col items-center gap-3">
        <GlassButton href="/shop" size="sm" className="text-white">
          <span>לכל המוצרים</span>
          <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />
        </GlassButton>
      </div>
      </Container>
    </section>
    </LiquidCard>
  );
}

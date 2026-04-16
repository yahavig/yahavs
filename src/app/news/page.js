import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import ExpandableNewsGrid from "@/components/sections/ExpandableNewsGrid";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import { getSiteConfig } from "@/lib/content";
import { getNews } from "@/lib/news";

export const revalidate = 1800;

export default async function NewsPage() {
  const [siteConfig, articles] = await Promise.all([getSiteConfig(), getNews(30)]);

  return (
    <>
      <Header navItems={siteConfig.navItems} />
      <main id="main-content" className="flex-1 pt-24 pb-16">
        <Container>
          <AnimatedEntry>
            <p className="mb-2 text-[11px] font-medium tracking-[0.25em] text-[var(--color-text-tertiary)] uppercase">חדשות</p>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">חדשות התפוח</h1>
            <p className="mb-8 text-[var(--color-text-secondary)]">
              30 הפוסטים האחרונים מ-<a href="https://9to5mac.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">9to5Mac</a>, מתורגמים אוטומטית לעברית.
            </p>
          </AnimatedEntry>
          <ExpandableNewsGrid articles={articles} />
        </Container>
      </main>
      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

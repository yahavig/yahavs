import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import AnimatedEntry from "@/components/ui/AnimatedEntry";
import { getSiteConfig } from "@/lib/content";

export default async function PodcastPage() {
  const siteConfig = await getSiteConfig();
  const spotifyUrl = siteConfig.socialLinks?.find(l => l.platform === "spotify")?.url;

  return (
    <>
      <Header navItems={siteConfig.navItems} />
      <main id="main-content" className="flex-1 pt-24 pb-16">
        <Container>
          <AnimatedEntry>
            <p className="mb-2 text-[11px] font-medium tracking-[0.25em] text-[var(--color-text-tertiary)] uppercase">פודקאסט</p>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">עדכון תוכנה</h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
              הפודקאסט הוא המקום שבו אני לוקח את כל מה שאני חושב על Apple, טכנולוגיה וחוויית משתמש, ונותן לזה יותר עומק, הקשר ודעה.
            </p>
          </AnimatedEntry>
          {spotifyUrl && (
            <AnimatedEntry delay={0.1}>
              <iframe src={`https://open.spotify.com/embed/show/2bzIcwU1WsEmgOugv7sKnW?utm_source=generator&theme=0`}
                width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy" className="rounded-2xl max-w-2xl" title="עדכון תוכנה - פודקאסט ב-Spotify" />
            </AnimatedEntry>
          )}
        </Container>
      </main>
      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

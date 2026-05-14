import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { getSiteConfig } from "@/lib/content";

export default async function PrivacyPage() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <Header navItems={siteConfig.navItems} />
      <main id="main-content" className="flex-1 pt-24 pb-16">
        <Container>
          <div className="rounded-3xl overflow-hidden glass-strong p-8 sm:p-12 mx-auto max-w-2xl">
            <h1 className="mb-8 text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">פרטיות</h1>
            <div className="prose prose-sm max-w-none text-[var(--color-text-secondary)] leading-relaxed">
              <p>האתר yahavguetta.com אינו אוסף מידע אישי מזהה על המשתמשים שלו.</p>
              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">שירותי צד שלישי</h2>
              <p>האתר משתמש בשירותים חיצוניים כגון YouTube, Spotify ו-9to5Mac לצורך הצגת תוכן. שירותים אלו כפופים למדיניות הפרטיות שלהם.</p>
              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">עוגיות</h2>
              <p>האתר עשוי להשתמש בעוגיות טכניות בלבד לצורך פעילות תקינה של הדפדפן.</p>
              <h2 className="mt-6 mb-2 text-base font-semibold text-[var(--color-text-primary)]">יצירת קשר</h2>
              <p>לכל שאלה בנושא פרטיות, ניתן לפנות דרך Instagram: <a href="https://www.instagram.com/yahavguetta/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">@yahavguetta</a></p>
            </div>
          </div>
        </Container>
      </main>
      <Footer socialLinks={siteConfig.socialLinks} siteName={siteConfig.title} />
    </>
  );
}

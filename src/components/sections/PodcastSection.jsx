import Container from "@/components/ui/Container";

const SHOW_ID = "2bzIcwU1WsEmgOugv7sKnW";
const SPOTIFY_EMBED = `https://open.spotify.com/embed/show/${SHOW_ID}?utm_source=generator&theme=0`;

export default function PodcastSection({ spotifyUrl }) {
  return (
    <section id="podcast" className="py-14 sm:py-20">
      <Container>
        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1DB954]">
              <SpotifyIcon />
            </span>
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">
                פודקאסט - עדכון תוכנה
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                האזינו לאפיזודות האחרונות
              </p>
            </div>
          </div>
          {spotifyUrl && (
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition-all duration-200 hover:scale-[1.04] hover:shadow-lg"
            >
              פתח ב-Spotify ←
            </a>
          )}
        </div>

        {/* Two-column layout: embed + description */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* Description */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <div className="rounded-2xl p-6 sm:p-8 glass">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1DB954]/10 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-[#1DB954] animate-pulse" />
                <span className="text-xs font-semibold text-[#1DB954]">בקרוב - פרק חדש</span>
              </div>
              <h3 className="mb-3 text-lg font-bold text-[var(--color-text-primary)] sm:text-xl">
                הפודקאסט על טכנולוגיה בעברית
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                הפודקאסט הוא המקום שבו אני לוקח את כל מה שאני חושב על Apple, טכנולוגיה וחוויית משתמש, ונותן לזה יותר עומק, הקשר ודעה. מעבר לחדשות עצמן, זה מרחב לדבר על מה באמת השתנה, למה זה חשוב, מה אפל עושה נכון או לא נכון, ואיך כל זה פוגש אותנו בתור משתמשים ביום יום. זה פחות כותרות, ויותר להבין את התמונה הגדולה.
              </p>
            </div>
          </div>

          {/* Spotify embed */}
          <div className="order-1 lg:order-2">
            <iframe
              src={SPOTIFY_EMBED}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-2xl"
              title="עדכון תוכנה - פודקאסט ב-Spotify"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function SpotifyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.24-3.021-1.85-6.821-2.27-11.3-1.24-.418.1-.85-.16-.95-.58-.1-.418.16-.85.58-.95 4.9-1.12 9.12-.64 12.521 1.43.38.23.5.72.25 1.1zm1.471-3.27c-.301.459-.921.601-1.38.3-3.451-2.12-8.7-2.73-12.78-1.491-.491.15-1.01-.13-1.16-.621-.15-.489.13-1.01.621-1.16 4.66-1.41 10.46-.72 14.44 1.7.441.27.58.89.26 1.272zm.13-3.4c-4.14-2.46-10.98-2.69-14.93-1.49-.599.19-1.23-.16-1.42-.76-.19-.599.16-1.23.76-1.42 4.55-1.38 12.12-1.11 16.9 1.73.511.3.681 1.01.38 1.52-.3.5-1.01.67-1.52.38z" />
    </svg>
  );
}

import Container from "@/components/ui/Container";

const SHOW_ID = "2bzIcwU1WsEmgOugv7sKnW";
const SPOTIFY_EMBED = `https://open.spotify.com/embed/show/${SHOW_ID}?utm_source=generator&theme=0`;
const APPLE_PODCASTS_URL = "https://podcasts.apple.com/il/podcast/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%95%D7%9B%D7%A0%D7%94/id1820547524?i=1000758151899";

const GLASS_SPOTIFY = {
  backdropFilter:       "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  background:           "rgba(30, 215, 96, 0.88)",
  border:               "1px solid rgba(255, 255, 255, 0.28)",
  boxShadow:
    "inset 1.5px 1.5px 1px rgba(255,255,255,0.40), inset -1px -1px 1px rgba(255,255,255,0.15), 0 4px 20px rgba(30,215,96,0.35)",
};

const GLASS_APPLE_PODCASTS = {
  backdropFilter:       "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  background:           "rgba(148, 58, 230, 0.88)",
  border:               "1px solid rgba(200, 140, 255, 0.40)",
  boxShadow:
    "inset 1.5px 1.5px 1px rgba(255,255,255,0.40), inset -1px -1px 1px rgba(255,255,255,0.15), 0 4px 20px rgba(148,58,230,0.38)",
};

export default function PodcastSection({ spotifyUrl }) {
  return (
    <section id="podcast" className="py-14 sm:py-20">
      <Container>
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
            פודקאסט - עדכון תוכנה
          </h2>
        </div>

        {/* Description */}
        <p className="mb-8 mx-auto max-w-2xl text-center text-lg leading-loose text-[var(--color-text-secondary)]">
          ובכן - חדשות על אפל, כל שבוע (טוב, כמעט). זה הפודקאסט שלי ושל ירין אזואלי (מנהל לשעבר בקבוצת האפליסטים) שהוא גם חבר מאוד טוב שלי. כל החדשות, השמועות, הדעות והשטויות מהשבוע האחרון - מפוצץ בצחוקים. זאת תכל׳ס שיחה מוקלטת של שני אפליסטים ממש שטותניקים (אני לא מאמין שהשתמשתי במילה הזאת). וכן, חד משמעית ניסיתי לחקות את הפורמט של Genius Bar...
        </p>

        {/* Listen buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {spotifyUrl && (
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
              style={GLASS_SPOTIFY}
            >
              <SpotifyIcon />
              <span>Spotify</span>
            </a>
          )}
          <a
            href={APPLE_PODCASTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
            style={GLASS_APPLE_PODCASTS}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/podcasts circle.png" alt="" width={20} height={20} className="rounded-md" aria-hidden="true" />
            <span>Apple Podcasts</span>
          </a>
        </div>

        {/* Spotify embed */}
        <div className="mx-auto max-w-2xl">
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
      </Container>
    </section>
  );
}

function SpotifyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.24-3.021-1.85-6.821-2.27-11.3-1.24-.418.1-.85-.16-.95-.58-.1-.418.16-.85.58-.95 4.9-1.12 9.12-.64 12.521 1.43.38.23.5.72.25 1.1zm1.471-3.27c-.301.459-.921.601-1.38.3-3.451-2.12-8.7-2.73-12.78-1.491-.491.15-1.01-.13-1.16-.621-.15-.489.13-1.01.621-1.16 4.66-1.41 10.46-.72 14.44 1.7.441.27.58.89.26 1.272zm.13-3.4c-4.14-2.46-10.98-2.69-14.93-1.49-.599.19-1.23-.16-1.42-.76-.19-.599.16-1.23.76-1.42 4.55-1.38 12.12-1.11 16.9 1.73.511.3.681 1.01.38 1.52-.3.5-1.01.67-1.52.38z" />
    </svg>
  );
}

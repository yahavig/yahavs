import { Google_Sans } from "next/font/google";
import "./globals.css";
import FloatingButtons from "@/components/ui/FloatingButtons";
import FloatingDock from "@/components/ui/FloatingDock";
import SiriWave from "@/components/ui/siri-wave";

const googleSans = Google_Sans({
  variable: "--font-sans",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://yahavguetta.com"),
  title: "yahavguetta.com",
  description:
    "הבית הרשמי של yahavguetta.com - סרטונים, סקירות, מדריכים ופרשנות על עולם הטכנולוגיה והמוצרים של Apple.",
  icons: {
    icon: "/favi.png",
    shortcut: "/favi.png",
    apple: "/favi.png",
  },
  openGraph: {
    title: "yahavguetta.com",
    description:
      "סרטונים, סקירות, מדריכים ופרשנות על עולם הטכנולוגיה והמוצרים של Apple.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" className={`${googleSans.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Prevent dark/light flash before hydration */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var saved = localStorage.getItem('theme');
              if (saved === 'dark') document.documentElement.classList.add('dark');
              else if (saved === 'light') document.documentElement.classList.add('light');
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        {/* Siri wave shader background */}
        <SiriWave
          variant="wave"
          fill
          className="fixed inset-0 -z-10 w-full h-full"
        />

        {/* Skip to main content - accessibility requirement */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[300] focus:rounded-md focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
        >
          דלג לתוכן הראשי
        </a>

        {children}

        {/* Global floating buttons - accessibility + AI */}
        <FloatingButtons />

        {/* Floating macOS-style dock */}
        <FloatingDock />
      </body>
    </html>
  );
}

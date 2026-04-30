import { Arimo } from "next/font/google";
import "./globals.css";
import FloatingButtons from "@/components/ui/FloatingButtons";
import FloatingDock from "@/components/ui/FloatingDock";

const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

export const metadata = {
  title: "yahav's | טכנולוגיה, מוצרים וחוויות",
  description:
    "הבית הרשמי של yahav's - סרטונים, סקירות, מדריכים ופרשנות על עולם הטכנולוגיה והמוצרים של Apple.",
  openGraph: {
    title: "yahav's | טכנולוגיה, מוצרים וחוויות",
    description:
      "סרטונים, סקירות, מדריכים ופרשנות על עולם הטכנולוגיה והמוצרים של Apple.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" className={`${arimo.variable} h-full`}>
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
        {/* Skip to main content - accessibility requirement */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[300] focus:rounded-xl focus:bg-[#0057B8] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
        >
          דלג לתוכן הראשי
        </a>

        {children}

        {/* Global floating buttons - accessibility + AI */}
        <FloatingButtons />

        {/* Floating macOS-style dock — mobile only */}
        <div className="md:hidden">
          <FloatingDock />
        </div>
      </body>
    </html>
  );
}

import "./globals.css";
import { Fira_Sans } from "next/font/google";
import { Button } from "./components/Button";
import { Navigation } from "./components/Navigation";
import { getAllPages } from "@/lib/api";
import { draftMode } from "next/headers";
import Script from "next/script"; // 🔹 Lisää tämä

export const metadata = {
  title: `Arkiapurin esittely`,
  description: `Täältä voit lukea Arkiapuri-sovelluksen esittelyn ja käyttöohjeet.`,
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

const firaSans = Fira_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fira-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();
  const allPages = await getAllPages(isEnabled);

  return (
    <html lang="fi" className={firaSans.variable}>
      <head>
        {/* Cookiebot */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="98d476d5-d07c-47f2-ad03-6b94d5f948dc"
          data-blockingmode="auto"
          data-language="fi"
          type="text/javascript"
          async
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4V2B47HVMN"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4V2B47HVMN');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <Navigation pages={allPages} />
        {children}
        <footer className="py-8" style={{ backgroundColor: "#eeeeec" }}>
          <div className="container mx-auto px-5">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <p className="text-gray-600">
                  © {new Date().getFullYear()} Anna Tiala.
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-0 md:gap-3">
                <Button
                  href="https://anna.tiala.fi/"
                  variant="primary"
                  className="w-full md:flex-1 whitespace-nowrap"
                >
                  Tutustu portfoliooni
                </Button>
                <Button
                  href="https://github.com/annaruntti"
                  variant="secondary"
                  className="w-full md:flex-1"
                >
                  GitHub-profiilini
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

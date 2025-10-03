import "./globals.css";
import { Fira_Sans } from "next/font/google";
import { Button } from "./components/Button";
import { Navigation } from "./components/Navigation";
import { getAllPages } from "@/lib/api";
import { draftMode } from "next/headers";

export const metadata = {
  title: `Arkiapurin esittely`,
  description: `Täältä voit lukea Arkiapuri-sovelluksen esittelyn ja käyttöohjeet.`,
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

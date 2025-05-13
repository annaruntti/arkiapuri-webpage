import "./globals.css";
import { Fira_Sans } from "next/font/google";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
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
  const allPages = (await getAllPages(isEnabled)) || [];
  const frontPage = allPages.find(
    (page: { slug: string }) => page.slug === "etusivu"
  );

  return (
    <html lang="fi" className={firaSans.variable}>
      <body className="min-h-screen flex flex-col">
        <Navigation pages={allPages} />
        <Header frontPage={frontPage} />

        <main className="flex-grow">{children}</main>

        <footer className="bg-gray-100 py-8">
          <div className="container mx-auto px-5">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <p className="text-gray-600">
                  © {new Date().getFullYear()} Anna Tiala. Kaikki oikeudet
                  pidätetään.
                </p>
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <Button
                  href="https://anna.tiala.fi/"
                  variant="primary"
                  className="mx-3 mb-3 lg:mb-0"
                >
                  Tutustu portfoliooni
                </Button>
                <Button
                  href="https://github.com/annaruntti"
                  variant="secondary"
                  className="mx-3 mx-3 mb-6 lg:mb-0"
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

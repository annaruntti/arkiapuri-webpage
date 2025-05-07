import "./globals.css";
import { Fira_Sans } from "next/font/google";
import { EXAMPLE_PATH, CMS_NAME } from "@/lib/constants";
import { Button } from "./components/Button";

export const metadata = {
  title: `Arkiapurin esittely`,
  description: `Täältä voit lukea Arkiapuri-sovelluksen esittelyn ja käyttöohjeet.`,
};

const firaSans = Fira_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-sans",
});

function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <div className="container mx-auto px-5">
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-2xl lg:text-3xl font-semibold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Nettisivujen ja Arkiapuri-sovelluksen kehitys ja design: Anna Tiala
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <Button
              href="https://anna.tiala.fi/"
              variant="primary"
              className="mx-3 mb-6 lg:mb-0"
            >
              Tutustu portfoliooni
            </Button>
            <a
              href={`https://github.com/annaruntti`}
              className="mx-3 font-semibold hover:underline"
            >
              GitHub-profiilini
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={firaSans.variable}>
      <body>
        <section className="min-h-screen">
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}

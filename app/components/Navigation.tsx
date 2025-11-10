"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

interface NavigationProps {
  pages: {
    slug: string;
    title: string;
  }[];
}

export function Navigation({ pages }: NavigationProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-300"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
    >
      <div className="container mx-auto px-5">
        {/* Mobile: Stacked layout */}
        <div className="md:hidden">
          {/* Logo row - hide when scrolled on front-page, always visible on other pages */}
          <div
            className={`flex justify-center pt-3 transition-all duration-300 ${
              pathname === "/" && isScrolled
                ? "max-h-0 pt-0 opacity-0 overflow-hidden"
                : "max-h-20 opacity-100"
            }`}
          >
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-semibold hover:text-primary transition-colors pb-1"
            >
              <Image
                src="https://images.ctfassets.net/2pij69ehhf4n/6LZK728PZQsNiI5R5t4VUa/3122e850f29febf7b05cc2ff018cdae8/arkiapuri-logo.png"
                alt="Arkiapuri logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span>Arkiapuri</span>
            </Link>
          </div>

          {/* Navigation links row - show when scrolled on front-page, hide when scrolled on other pages */}
          <div
            className={`border-t border-gray-100 transition-all duration-300 ${
              pathname === "/"
                ? isScrolled
                  ? "max-h-20 opacity-100"
                  : "max-h-20 opacity-100"
                : isScrolled
                ? "max-h-0 py-0 opacity-0 overflow-hidden"
                : "max-h-20 opacity-100"
            }`}
          >
            <div
              className="flex justify-center items-center space-x-4"
              style={{ height: "38px", padding: "0.5rem" }}
            >
              <Link
                href="/artikkelit/blogi"
                className={`text-gray-600 hover:text-primary transition-colors text-sm font-semibold py-2 md:py-4 ${
                  pathname?.startsWith("/artikkelit/blogi") ||
                  pathname?.startsWith("/posts")
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
              >
                Blogi
              </Link>
              <Link
                href="/artikkelit/reseptit"
                className={`text-gray-600 hover:text-primary transition-colors text-sm font-semibold py-2 md:py-4 ${
                  pathname?.startsWith("/artikkelit/reseptit")
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
              >
                Reseptit
              </Link>
              {pages
                .filter((page) => page.slug !== "etusivu")
                .map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${page.slug}`}
                    className={`text-gray-600 hover:text-primary transition-colors text-sm font-semibold py-2 md:py-4 ${
                      pathname === `/${page.slug}`
                        ? "border-b-2 border-primary text-primary"
                        : ""
                    }`}
                  >
                    {page.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Desktop: Single row layout */}
        <div className="hidden md:flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-semibold hover:text-primary transition-colors"
          >
            <Image
              src="https://images.ctfassets.net/2pij69ehhf4n/6LZK728PZQsNiI5R5t4VUa/3122e850f29febf7b05cc2ff018cdae8/arkiapuri-logo.png"
              alt="Arkiapuri logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span>Arkiapuri</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/artikkelit/blogi"
              className={`text-gray-600 hover:text-primary transition-colors text-base font-semibold py-3 relative ${
                pathname?.startsWith("/artikkelit/blogi") ||
                pathname?.startsWith("/posts")
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : ""
              }`}
              style={{ marginTop: 0, marginBottom: 0 }}
            >
              Blogi
            </Link>
            <Link
              href="/artikkelit/reseptit"
              className={`text-gray-600 hover:text-primary transition-colors text-base font-semibold py-3 relative ${
                pathname?.startsWith("/artikkelit/reseptit")
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : ""
              }`}
              style={{ marginTop: 0, marginBottom: 0 }}
            >
              Reseptit
            </Link>
            {pages
              .filter((page) => page.slug !== "etusivu")
              .map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className={`text-gray-600 hover:text-primary transition-colors text-base font-semibold py-3 relative ${
                    pathname === `/${page.slug}`
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                      : ""
                  }`}
                  style={{ marginTop: 0, marginBottom: 0 }}
                >
                  {page.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

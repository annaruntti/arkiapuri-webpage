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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
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
              className="flex items-center space-x-2 text-xl font-semibold hover:text-gray-600 transition-colors pb-1"
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
            className={`border-t border-gray-100 py-2 transition-all duration-300 ${
              pathname === "/"
                ? isScrolled
                  ? "max-h-20 opacity-100"
                  : "max-h-20 opacity-100"
                : isScrolled
                ? "max-h-0 py-0 opacity-0 overflow-hidden"
                : "max-h-20 opacity-100"
            }`}
          >
            <div className="flex justify-center items-center space-x-4">
              <Link
                href="/artikkelit"
                className={`text-gray-600 hover:text-gray-900 transition-colors pb-1 text-sm font-semibold ${
                  pathname === "/artikkelit" ? "border-b-2 border-primary" : ""
                }`}
              >
                Artikkelit
              </Link>
              {pages
                .filter((page) => page.slug !== "etusivu")
                .map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${page.slug}`}
                    className={`text-gray-600 hover:text-gray-900 transition-colors pb-1 text-sm font-semibold ${
                      pathname === `/${page.slug}`
                        ? "border-b-2 border-primary"
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
        <div className="hidden md:flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-semibold hover:text-gray-600 transition-colors pb-1"
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
              href="/artikkelit"
              className={`text-gray-600 hover:text-gray-900 transition-colors pb-1 text-base font-semibold ${
                pathname === "/artikkelit" ? "border-b-2 border-primary" : ""
              }`}
            >
              Artikkelit
            </Link>
            {pages
              .filter((page) => page.slug !== "etusivu")
              .map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className={`text-gray-600 hover:text-gray-900 transition-colors pb-1 text-base font-semibold ${
                    pathname === `/${page.slug}`
                      ? "border-b-2 border-primary"
                      : ""
                  }`}
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

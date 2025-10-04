"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  pages: {
    slug: string;
    title: string;
  }[];
}

export function Navigation({ pages }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className={`text-xl font-semibold hover:text-gray-600 transition-colors pb-1 ${
              pathname === "/" ? "border-b-2 border-primary" : ""
            }`}
          >
            Arkiapuri
          </Link>
          <div className="flex items-center space-x-2 md:space-x-4">
            {pages
              .filter((page) => page.slug !== "etusivu")
              .map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className={`text-gray-600 hover:text-gray-900 transition-colors pb-1 text-sm md:text-base font-semibold ${
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

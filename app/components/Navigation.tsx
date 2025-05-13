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
  const isPostPage = pathname?.startsWith("/posts/");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-semibold hover:text-gray-600 transition-colors"
          >
            Arkiapuri
          </Link>

          <div className="flex items-center space-x-8">
            {pages
              .filter((page) => page.slug !== "etusivu")
              .map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className={`text-gray-600 hover:text-gray-900 transition-colors ${
                    pathname === `/${page.slug}` ? "font-medium" : ""
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

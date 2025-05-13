"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

interface HeaderProps {
  frontPage?: {
    title?: string;
    introduction?: string;
    heroImage?: {
      url: string;
    };
  };
  postTitle?: string;
  postHeroImage?: {
    url: string;
  };
}

export function Header({ frontPage, postTitle, postHeroImage }: HeaderProps) {
  const pathname = usePathname();
  const isPostPage = pathname?.startsWith("/posts/");

  // If we're on a post page, only show the post title
  if (isPostPage) {
    if (!postTitle) return null;

    return (
      <header className="relative min-h-screen">
        {postHeroImage && (
          <div className="absolute inset-0" aria-label="Hero image">
            <Image
              src={postHeroImage.url}
              alt="Artikkelin hero-kuva"
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="absolute bottom-20 right-5 md:right-20 z-10">
          <div className="bg-white/90 p-8 rounded-lg shadow-lg max-w-2xl ml-5 md:ml-0">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-tight">
              {postTitle}
            </h1>
          </div>
        </div>
      </header>
    );
  }

  // If we're not on a post page, only show the front page content
  if (!frontPage) return null;

  return (
    <header className="relative min-h-screen">
      {frontPage.heroImage && (
        <div className="absolute inset-0" aria-label="Hero image">
          <Image
            src={frontPage.heroImage.url}
            alt="Etusivun hero-kuva, joka on AI:n luoma abstrakti kuvio"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="absolute bottom-20 right-5 md:right-20 z-10">
        <div className="bg-white/90 p-8 rounded-lg shadow-lg max-w-2xl ml-5 md:ml-0">
          <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter leading-tight">
            {frontPage.title}
          </h1>
          {frontPage.introduction && (
            <div className="text-left text-lg pt-5">
              <h2
                className="text-1xl lg:text-3xl leading-tight"
                id="introduction"
              >
                {frontPage.introduction}
              </h2>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

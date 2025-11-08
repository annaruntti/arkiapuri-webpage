"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { HeaderContent } from "./HeaderContent";
import { ScrollAnimation } from "./ScrollAnimation";

interface HeaderProps {
  frontPage?: {
    title?: string;
    introduction?: string;
    heroImage?: {
      url: string;
      description?: string;
    };
  };
  postTitle?: string;
  postHeroImage?: {
    url: string;
    description?: string;
  };
  pageTitle?: string;
  coverImage?: {
    url: string;
    description?: string;
  };
  objectPosition?: string;
}

export function Header({
  frontPage,
  postTitle,
  postHeroImage,
  pageTitle,
  coverImage,
  objectPosition = "center",
}: HeaderProps) {
  const pathname = usePathname();
  const isPostPage = pathname?.startsWith("/posts/");
  const isFrontPage = pathname === "/";

  // If we're on a post page, only show the post title
  if (isPostPage) {
    if (!postTitle) return null;

    return (
      <header
        className="relative"
        style={{ minHeight: "100vh", marginTop: "-80px", paddingTop: "80px" }}
      >
        {postHeroImage && (
          <div className="absolute inset-0" aria-label="Hero image">
            <Image
              src={postHeroImage.url}
              alt={postHeroImage.description || "Artikkelin hero-kuva"}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <HeaderContent isFrontPage={false}>
          <ScrollAnimation animation="fade-in" delay={0.3}>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-tight">
              {postTitle}
            </h1>
          </ScrollAnimation>
        </HeaderContent>
      </header>
    );
  }

  // If we're on a regular page, show the page cover image and title
  if (!isFrontPage && pageTitle) {
    return (
      <header
        className="relative"
        style={{ minHeight: "50vh", marginTop: "-80px", paddingTop: "80px" }}
      >
        {coverImage && (
          <div className="absolute inset-0" aria-label="Page cover image">
            <Image
              src={coverImage.url}
              alt={coverImage.description || "Sivun kansikuva"}
              fill
              style={{ 
                objectPosition: objectPosition,
                objectFit: 'cover',
              }}
              priority
            />
          </div>
        )}
        <HeaderContent isFrontPage={false}>
          <ScrollAnimation animation="fade-in" delay={0.3}>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-tight">
              {pageTitle}
            </h1>
          </ScrollAnimation>
        </HeaderContent>
      </header>
    );
  }

  // If we're on the front page, show the front page content
  if (!frontPage) return null;

  return (
    <header
      className="relative"
      style={{ minHeight: "100vh", marginTop: "-80px", paddingTop: "80px" }}
    >
      {frontPage.heroImage && (
        <div className="absolute inset-0" aria-label="Hero image">
          <Image
            src={frontPage.heroImage.url}
            alt={frontPage.heroImage.description || "Etusivun hero-kuva"}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <HeaderContent>
        <ScrollAnimation animation="fade-in" delay={0.3}>
          <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter leading-tight">
            {frontPage.title}
          </h1>
        </ScrollAnimation>
        {frontPage.introduction && (
          <ScrollAnimation animation="fade-in-up" delay={0.5}>
            <div className="text-left text-lg pt-5">
              <h2
                className="text-1xl lg:text-3xl leading-tight"
                id="introduction"
              >
                {frontPage.introduction}
              </h2>
            </div>
          </ScrollAnimation>
        )}
      </HeaderContent>
    </header>
  );
}

import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreStories from "./more-stories";
import { Markdown } from "@/lib/markdown";
import { ScrollAnimation } from "./components/ScrollAnimation";

import { getAllPages } from "@/lib/api";
import { getAllPosts } from "@/lib/api";
import { Header } from "./components/Header";

// Utility function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Component to render YouTube video from rich text content
function YouTubeEmbed({ content }: { content: any }) {
  // Extract URL from rich text content
  const extractUrlFromRichText = (richTextContent: any): string | null => {
    if (!richTextContent?.content) return null;

    for (const node of richTextContent.content) {
      if (node.nodeType === "paragraph" && node.content) {
        for (const childNode of node.content) {
          // Check for hyperlink first
          if (childNode.nodeType === "hyperlink" && childNode.data?.uri) {
            return childNode.data.uri;
          }
          // Check for plain text that looks like a YouTube URL
          if (childNode.nodeType === "text" && childNode.value) {
            const text = childNode.value.trim();
            if (text.includes("youtube.com") || text.includes("youtu.be")) {
              return text;
            }
          }
        }
      }
    }
    return null;
  };

  const url = extractUrlFromRichText(content);
  if (!url) return <p>No YouTube URL found</p>;

  const videoId = getYouTubeVideoId(url);
  if (!videoId) return <p>Invalid YouTube URL</p>;

  return (
    <div
      className="mx-auto overflow-hidden rounded-lg relative w-full max-w-sm md:w-80 youtube-container"
      style={{ height: "650px" }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=1&disablekb=0&enablejsapi=0&cc_load_policy=0&playsinline=1`}
        title="Arkiapuri esittelyvideo"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg youtube-embed"
        role="application"
        aria-label="Arkiapuri esittelyvideo"
        loading="lazy"
        style={{
          width: "250%",
          height: "745px",
          position: "absolute",
          top: "-42px",
          left: "-75%",
          border: "none",
        }}
      ></iframe>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media (min-width: 769px) {
            .youtube-embed {
              width: 320px !important;
              height: 592px !important;
              left: 0px !important;
              top: 23px !important;
            }
            .youtube-container {
              width: 320px !important;
              height: 569px !important;
            }
          }
        `,
        }}
      />
    </div>
  );
}

function HeroPost({
  title,
  heroImage,
  date,
  excerpt = "",
  author,
  slug,
}: {
  title: string;
  heroImage: any;
  date: string;
  excerpt?: string;
  author: any;
  slug: string;
}) {
  return (
    <section>
      <ScrollAnimation animation="fade-in-up" delay={0.2}>
        <div className="mb-8 md:mb-16 group">
          <CoverImage
            title={title}
            slug={slug}
            url={heroImage.url}
            description={heroImage.description}
          />
        </div>
      </ScrollAnimation>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <ScrollAnimation animation="slide-in-left" delay={0.3}>
          <div>
            <h3 className="mb-4 text-2xl lg:text-4xl leading-tight">
              <Link
                href={`/posts/${slug}`}
                className="hover:text-primary transition-colors hover-scale"
              >
                {title}
              </Link>
            </h3>
            <div className="mb-4 md:mb-0 text-lg">
              <Date dateString={date} />
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animation="slide-in-right" delay={0.4}>
          <div>
            <p className="text-lg leading-relaxed mb-4">"{excerpt}"</p>
            {author && (
              <Avatar
                name={author.name}
                profilePicture={author.profilePicture}
              />
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

export default async function Home() {
  const { isEnabled } = await draftMode();
  const allPages = await getAllPages(isEnabled);
  const allPosts = await getAllPosts(isEnabled);
  const frontPage = allPages.find((page) => page.slug === "etusivu");
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  if (!frontPage) {
    return (
      <div className="container mx-auto px-5">
        <p>Etusivua ei löydy</p>
      </div>
    );
  }

  return (
    <>
      <Header frontPage={frontPage} />
      <main className="flex-1">
        <ScrollAnimation animation="fade-in" delay={0.5} duration={2.0}>
          <div className="container mx-auto px-5 pt-12 pb-10">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-xl">
                <Markdown
                  content={frontPage.content.json}
                  assets={frontPage.content.links?.assets?.block || []}
                />
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Two-column section: Text left, Video right */}
        {(frontPage.leftTextColumn || frontPage.rightVideoColumn) && (
          <ScrollAnimation animation="fade-in" delay={0.3}>
            <section
              className="py-14 mb-16"
              style={{ backgroundColor: "#eeeeec" }}
            >
              <div className="container mx-auto px-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left column - Text content */}
                  <div className="prose prose-lg">
                    {frontPage.leftTextColumn && (
                      <div className="text-lg leading-relaxed whitespace-pre-line">
                        {frontPage.leftTextColumn}
                      </div>
                    )}
                  </div>

                  {/* Right column - YouTube video */}
                  <div className="flex justify-center lg:justify-end">
                    {frontPage.rightVideoColumn && (
                      <YouTubeEmbed content={frontPage.rightVideoColumn.json} />
                    )}
                  </div>
                </div>
              </div>
            </section>
          </ScrollAnimation>
        )}

        <section className="mb-8">
          <div className="container mx-auto px-5">
            <ScrollAnimation animation="fade-in-up" delay={0.1}>
              <h2 className="mb-8 text-4xl md:text-5xl font-semibold tracking-tighter leading-tight">
                <Link
                  href="/artikkelit"
                  className="hover:text-primary transition-colors hover-scale"
                >
                  Arkiapuri-blogi
                </Link>
              </h2>
            </ScrollAnimation>

            {heroPost && (
              <HeroPost
                title={heroPost.title}
                heroImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            )}
            {morePosts.length > 0 && <MoreStories morePosts={morePosts} />}
          </div>
        </section>
      </main>
    </>
  );
}

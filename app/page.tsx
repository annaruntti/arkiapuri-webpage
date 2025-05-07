import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreStories from "./more-stories";
import { Markdown } from "@/lib/markdown";

import { getAllPages } from "@/lib/api";
import { getAllPosts } from "@/lib/api";

function Intro({ frontPage }: { frontPage: any }) {
  console.log(
    "Intro component - frontPage:",
    JSON.stringify(frontPage, null, 2)
  );

  if (!frontPage?.content) {
    return null;
  }

  return (
    <>
      <section className="flex-col md:flex-row flex items-center md:justify-between pt-16 mb-5 md:mb-5">
        <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter leading-tight md:pr-8">
          {frontPage?.title}
        </h1>
        {frontPage.introduction && (
          <div className="text-center md:text-left text-lg pt-5 md:pl-8">
            <h2 className="text-1xl lg:text-3xl leading-tight">
              {frontPage.introduction}
            </h2>
          </div>
        )}
      </section>
      <section>
        <div className="text-center md:text-left text-lg pt-2 mb-8">
          <Markdown
            content={frontPage.content.json}
            assets={frontPage.content.links?.assets?.block || []}
          />
        </div>
      </section>
      <section className="-mx-5 md:mx-0">
        <div className="w-full h-auto mb-10">
          <img
            src={frontPage.heroImage.url}
            alt="Etusivun hero-kuva, joka on AI:n luoma abstrakti kuvio"
            className="w-full h-auto"
          />
        </div>
      </section>
      <h2 className="mb-8 text-4xl md:text-5xl font-semibold tracking-tighter leading-tight">
        Arkiapuri-blogi
      </h2>
    </>
  );
}

function HeroPost({
  title,
  coverImage,
  date,
  excerpt = "",
  author,
  slug,
}: {
  title: string;
  coverImage: any;
  date: string;
  excerpt?: string;
  author: any;
  slug: string;
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-2xl lg:text-4xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">"{excerpt}"</p>
          {author && (
            <Avatar name={author.name} profilePicture={author.profilePicture} />
          )}
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = await draftMode();
  const allPages = (await getAllPages(isEnabled)) || [];
  const allPosts = (await getAllPosts(isEnabled)) || [];
  const frontPage = allPages.find(
    (page: { slug: string }) => page.slug === "etusivu"
  );
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  console.log(
    "Front page content:",
    JSON.stringify(frontPage?.content, null, 2)
  );
  console.log(
    "Front page assets:",
    JSON.stringify(frontPage?.content?.links?.assets?.block, null, 2)
  );

  return (
    <div className="container mx-auto px-5">
      <Intro frontPage={frontPage} />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {morePosts.length > 0 && <MoreStories morePosts={morePosts} />}
    </div>
  );
}

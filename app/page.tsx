import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreStories from "./more-stories";
import { Markdown } from "@/lib/markdown";

import { getAllPages } from "@/lib/api";
import { getAllPosts } from "@/lib/api";

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
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={heroImage.url} />
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

  if (!frontPage) {
    return null;
  }

  return (
    <>
      <section aria-labelledby="content" className="py-16 mb-10 bg-gray-50">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 id="content" className="sr-only">
              Sisältö
            </h2>
            <div className="prose prose-lg">
              <Markdown
                content={frontPage.content.json}
                assets={frontPage.content.links?.assets?.block || []}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="container mx-auto px-5">
          <h2 className="mb-8 text-4xl md:text-5xl font-semibold tracking-tighter leading-tight">
            Arkiapuri-blogi
          </h2>

          {heroPost && (
            <HeroPost
              title={heroPost.title}
              heroImage={heroPost.heroImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories morePosts={morePosts} />}
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { draftMode } from "next/headers";

import MoreStories from "../../more-stories";
import Avatar from "../../avatar";
import Date from "../../date";
import CoverImage from "../../cover-image";

import { Markdown } from "@/lib/markdown";
import { getAllPosts, getPostAndMorePosts } from "@/lib/api";

export async function generateStaticParams() {
  const allPosts = await getAllPosts(false);

  console.log("allPosts", allPosts);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { isEnabled } = await draftMode();
  const { post, morePosts } = await getPostAndMorePosts(
    resolvedParams.slug,
    isEnabled
  );

  if (!post) {
    return (
      <div className="container mx-auto px-5">
        <p>Ei vielä tätä kirjoituksia</p>
      </div>
    );
  }

  console.log("Post coverImage:", post.coverImage);

  return (
    <article>
      <div className="container mx-auto px-5 py-8">
        <div className="md:mb-6">
          {post.excerpt && (
            <h2 className="text-xl leading-relaxed mb-4">"{post.excerpt}"</h2>
          )}
        </div>
      </div>
      {post.coverImage?.url && (
        <section className="w-full mb-8 md:mb-16">
          <CoverImage
            title={post.title}
            url={post.coverImage.url}
            description={post.coverImage.description}
          />
        </section>
      )}
      <div className="container mx-auto px-5">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            {post.author && (
              <Avatar
                name={post.author.name}
                profilePicture={post.author.profilePicture}
              />
            )}
          </div>
          <div className="mb-6 text-lg">
            <Date dateString={post.date} />
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="prose">
            <Markdown
              content={post.content.json}
              assets={post.content.links.assets.block}
            />
          </div>
        </div>
      </div>

      <section className="mt-28 mb-24">
        <div className="container mx-auto px-5">
          <hr className="border-accent-2 mb-24" />
          <MoreStories morePosts={morePosts} />
        </div>
      </section>
    </article>
  );
}

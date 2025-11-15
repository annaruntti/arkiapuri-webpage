import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import MoreStories from "../../more-stories";
import Avatar from "../../avatar";
import Date from "../../date";
import CoverImage from "../../cover-image";
import { ArticleSchema } from "../../components/ArticleSchema";

import { Markdown } from "@/lib/markdown";
import { getAllPosts, getPostAndMorePosts } from "@/lib/api";

export async function generateStaticParams() {
  const allPosts = await getAllPosts(false);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { post } = await getPostAndMorePosts(resolvedParams.slug, false);

  if (!post) {
    return {
      title: "Artikkelia ei löydy - Arkiapuri",
    };
  }

  return {
    title: `${post.title} - Arkiapuri Blogi`,
    description: post.excerpt || `Lue lisää: ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage?.url ? [post.coverImage.url] : [],
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage?.url ? [post.coverImage.url] : [],
    },
  };
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
    notFound();
  }

  const url = `https://arkiapuri.fi/posts/${resolvedParams.slug}`;

  return (
    <>
      <ArticleSchema post={post} url={url} />
      <main className="flex-1">
        <div className="container mx-auto px-5 py-8">
          <div className="md:mb-6">
            {post.excerpt && (
              <h2 className="text-xl leading-relaxed pt-4">"{post.excerpt}"</h2>
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
      </main>
    </>
  );
}

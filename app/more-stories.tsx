import Link from "next/link";
import Avatar from "./avatar";
import DateComponent from "./date";
import CoverImage from "./cover-image";

function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
  slug: string;
}) {
  return (
    <div>
      <div className="mb-5">
        {coverImage?.url && (
          <CoverImage
            title={title}
            slug={slug}
            url={coverImage.url}
            description={coverImage.description}
          />
        )}
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateComponent dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">"{excerpt}"</p>
      {author && (
        <Avatar name={author.name} profilePicture={author.profilePicture} />
      )}
    </div>
  );
}

export default function MoreStories({ morePosts }: { morePosts: any[] }) {
  return (
    <section>
      <h2 className="mb-8 text-4xl md:text-5xl font-semibold tracking-tighter leading-tight">
        Lisää artikkeleita
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 lg:gap-x-16 gap-y-20 md:gap-y-32 mb-32">
        {morePosts.map((post) => (
          <div key={post.slug}>
            <div className="mb-5">
              <CoverImage
                title={post.title}
                slug={post.slug}
                url={post.heroImage.url}
                description={post.heroImage.description}
              />
            </div>
            <h3 className="mb-3 text-3xl leading-snug">
              <Link href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h3>
            <div className="mb-4 text-lg">
              <DateComponent dateString={post.date} />
            </div>
            <p className="text-lg leading-relaxed mb-4">"{post.excerpt}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}

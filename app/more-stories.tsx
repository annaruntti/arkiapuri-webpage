import Link from "next/link";
import Avatar from "./avatar";
import DateComponent from "./date";
import CoverImage from "./cover-image";

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
                url={post.coverImage.url}
                description={post.coverImage.description}
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
            <div>
              {post.author && (
                <Avatar
                  name={post.author.name}
                  profilePicture={post.author.profilePicture}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

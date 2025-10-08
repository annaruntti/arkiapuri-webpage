import Link from "next/link";
import Avatar from "./avatar";
import DateComponent from "./date";
import CoverImage from "./cover-image";
import { ScrollAnimation } from "./components/ScrollAnimation";

export default function MoreStories({ morePosts }: { morePosts: any[] }) {
  return (
    <ScrollAnimation animation="fade-in-up" delay={0.1}>
      <section>
        <ScrollAnimation animation="bounce-in" delay={0.2}>
          <h2 className="mb-8 text-4xl md:text-5xl font-semibold tracking-tighter leading-tight">
            <Link
              href="/artikkelit"
              className="hover:text-primary transition-colors hover-scale"
            >
              Lisää artikkeleita
            </Link>
          </h2>
        </ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 lg:gap-x-16 gap-y-20 md:gap-y-32 mb-32 animate-stagger">
          {morePosts.map((post, index) => (
            <ScrollAnimation
              key={post.slug}
              animation="fade-in-up"
              delay={0.3 + index * 0.1}
            >
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:shadow-purple-100 hover:-translate-y-1 transition-all duration-300 group">
                <div className="aspect-video relative">
                  <CoverImage
                    title={post.title}
                    slug={post.slug}
                    url={post.coverImage.url}
                    description={post.coverImage.description}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 leading-tight">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    "{post.excerpt}"
                  </p>
                  <div className="space-y-3">
                    <DateComponent dateString={post.date} />
                    {post.author && (
                      <Avatar
                        name={post.author.name}
                        profilePicture={post.author.profilePicture}
                      />
                    )}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </section>
    </ScrollAnimation>
  );
}

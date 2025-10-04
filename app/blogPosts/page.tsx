import { draftMode } from "next/headers";
import Link from "next/link";
import { getAllPosts } from "@/lib/api";
import Date from "../date";
import CoverImage from "../cover-image";
import Avatar from "../avatar";
import { Header } from "../components/Header";

export const metadata = {
  title: "Artikkelit - Arkiapuri",
  description: "Kaikki Arkiapuri-blogin artikkelit",
};

function PostCard({
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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <CoverImage
          title={title}
          slug={slug}
          url={coverImage.url}
          description={coverImage.description}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 leading-tight">
          <Link
            href={`/posts/${slug}`}
            className="hover:text-primary transition-colors"
          >
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{excerpt}</p>
        <div className="space-y-3">
          <Date dateString={date} />
          {author && (
            <Avatar name={author.name} profilePicture={author.profilePicture} />
          )}
        </div>
      </div>
    </div>
  );
}

export default async function ArtikkelitPage() {
  const { isEnabled } = await draftMode();
  const allPosts = await getAllPosts(isEnabled);

  return (
    <>
      <Header
        pageTitle="Artikkelit"
        coverImage={{
          url: "https://images.ctfassets.net/2pij69ehhf4n/4R7zfMSrOPfokg9WPGYbhk/4b8e4f5fa1d5d3c4028cffdeee59ad2c/Untitled_design.png",
          description: "Artikkelit header image",
        }}
      />
      <main className="flex-grow">
        <div className="container mx-auto px-5 pt-10 md:pt-14 pb-10 md:pb-14">
          <div className="max-w-3xl mx-auto">
            <div className="text-xl leading-relaxed mb-10 md:mb-12">
              Tutustu kaikkiin Arkiapuri-blogin artikkeleihin. Löydät täältä
              vinkkejä arjen sujuvoittamiseen ja ruokahuollon helpottamiseen.
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {allPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPosts.map((post) => (
                  <PostCard
                    key={post.slug}
                    title={post.title}
                    coverImage={post.coverImage}
                    date={post.date}
                    excerpt={post.excerpt}
                    author={post.author}
                    slug={post.slug}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">Ei vielä artikkeleita.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

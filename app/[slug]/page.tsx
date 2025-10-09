import { draftMode } from "next/headers";
import { Markdown } from "@/lib/markdown";
import { getAllPages } from "@/lib/api";
import { Header } from "@/app/components/Header";

export async function generateStaticParams() {
  const allPages = await getAllPages(false);
  return allPages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { isEnabled } = await draftMode();
  const allPages = await getAllPages(isEnabled);
  const page = allPages.find((page) => page.slug === params.slug);

  if (!page) {
    return (
      <div className="container mx-auto px-5">
        <p>Sivua ei löydy</p>
      </div>
    );
  }

  return (
    <>
      <Header pageTitle={page.title} coverImage={page.coverImage} />
      <main className="flex-1">
        <div className="container mx-auto px-5 py-8">
          <div className="max-w-3xl mx-auto">
            {page.introduction && (
              <div className="text-xl leading-relaxed mb-8">
                {page.introduction}
              </div>
            )}
            <div className="prose prose-lg">
              <Markdown
                content={page.content.json}
                assets={page.content.links?.assets?.block || []}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

import { getPostAndMorePosts } from "@/lib/api";
import { draftMode } from "next/headers";
import { Header } from "../../components/Header";

export default async function PostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const { post } = await getPostAndMorePosts(slug, isEnabled);

  if (!post) {
    return null;
  }

  return (
    <>
      <Header postTitle={post.title} postHeroImage={post.heroImage} />
      {children}
    </>
  );
}

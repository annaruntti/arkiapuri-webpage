import { getPostAndMorePosts } from "@/lib/api";
import { draftMode } from "next/headers";
import { Header } from "../../components/Header";

export default async function PostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { isEnabled } = await draftMode();
  const { post } = await getPostAndMorePosts(params.slug, isEnabled);

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

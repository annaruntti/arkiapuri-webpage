import { MetadataRoute } from "next";
import { getAllPosts, getAllRecipes, getAllPages } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://arkiapuri.fi";

  // Fetch all content
  const posts = await getAllPosts(false);
  const recipes = await getAllRecipes(false);
  const pages = await getAllPages(false);

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/artikkelit`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikkelit/blogi`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikkelit/reseptit`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  // Blog posts
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Recipes
  const recipeUrls = recipes.map((recipe) => ({
    url: `${baseUrl}/artikkelit/reseptit/${recipe.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Other pages
  const pageUrls = pages
    .filter((page) => page.slug !== "etusivu")
    .map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...mainPages, ...postUrls, ...recipeUrls, ...pageUrls];
}


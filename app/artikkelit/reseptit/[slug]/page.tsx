import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import CoverImage from "../../../cover-image";
import { Markdown } from "@/lib/markdown";
import { getAllRecipes, getRecipeAndMoreRecipes } from "@/lib/api";
import Script from "next/script";
import { RecipeCard } from "../../../components/RecipeCard";
import { RecipeSchema } from "../../../components/RecipeSchema";
import Image from "next/image";

export async function generateStaticParams() {
  const allRecipes = await getAllRecipes(false);

  console.log("allRecipes", allRecipes);

  return allRecipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { recipe } = await getRecipeAndMoreRecipes(resolvedParams.slug, false);

  if (!recipe) {
    return {
      title: "Reseptiä ei löydy - Arkiapuri",
    };
  }

  const ingredients = recipe.ingredientsCollection?.items
    .map((i) => i.name)
    .join(", ");

  return {
    title: `${recipe.title} - Arkiapuri Reseptit`,
    description: ingredients
      ? `${recipe.title} - Ainekset: ${ingredients.slice(0, 150)}...`
      : `Herkullinen resepti: ${recipe.title}`,
    openGraph: {
      title: recipe.title,
      description: `${recipe.category || "Resepti"} - ${
        recipe.preparationTime || ""
      }`,
      images: recipe.heroImage?.url ? [recipe.heroImage.url] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: `${recipe.category || "Resepti"} - ${
        recipe.preparationTime || ""
      }`,
      images: recipe.heroImage?.url ? [recipe.heroImage.url] : [],
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function MoreRecipes({ moreRecipes }: { moreRecipes: any[] }) {
  if (!moreRecipes || moreRecipes.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
        Lisää reseptejä
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {moreRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.slug}
            title={recipe.title}
            heroImage={recipe.heroImage}
            slug={recipe.slug}
            steps={recipe.steps}
            category={recipe.category}
            mealType={recipe.mealType}
            difficultyLevel={recipe.difficultyLevel}
            preparationTime={recipe.preparationTime}
          />
        ))}
      </div>
    </section>
  );
}

export default async function RecipePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { isEnabled } = await draftMode();
  const { recipe, moreRecipes } = await getRecipeAndMoreRecipes(
    resolvedParams.slug,
    isEnabled
  );

  if (!recipe) {
    notFound();
  }

  return (
    <>
      <RecipeSchema recipe={recipe} />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6513624758655536"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <main className="flex-1" style={{ marginTop: "-33px" }}>
        {recipe.heroImage?.url && (
          <section className="w-full mb-8 md:mb-16">
            <CoverImage
              title={recipe.title}
              url={recipe.heroImage.url}
              description={recipe.heroImage.description}
            />
          </section>
        )}
        <div className="container mx-auto px-5">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {recipe.title}
            </h1>

            {/* Category and Meal Type Tags */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {recipe.category && (
                <span className="text-sm px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
                  {recipe.category}
                </span>
              )}
              {recipe.mealType && (
                <span className="text-sm px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {recipe.mealType}
                </span>
              )}
            </div>

            {/* Preparation Time and Difficulty */}
            <div className="flex gap-6 mb-8 text-gray-700">
              {recipe.preparationTime && (
                <div className="flex items-center gap-2">
                  <span className="text-xl">⏱️</span>
                  <div>
                    <div className="text-xs text-gray-500 uppercase">
                      Valmistusaika
                    </div>
                    <div className="font-medium">{recipe.preparationTime}</div>
                  </div>
                </div>
              )}
              {recipe.difficultyLevel && (
                <div className="flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  <div>
                    <div className="text-xs text-gray-500 uppercase">
                      Vaikeustaso
                    </div>
                    <div className="font-medium">{recipe.difficultyLevel}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Blog Text Section */}
            {recipe.blogText && (
              <div className="mb-12">
                <div className="prose max-w-none">
                  <Markdown
                    content={recipe.blogText.json}
                    assets={recipe.blogText.links?.assets?.block || []}
                  />
                </div>
              </div>
            )}

            {/* Ingredients Section */}
            {recipe.ingredientsCollection &&
              recipe.ingredientsCollection.items.length > 0 && (
                <div className="mb-12 p-6 bg-gray-50 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Ainekset</h2>
                  <ul className="space-y-2">
                    {recipe.ingredientsCollection.items.map((ingredient) => (
                      <li
                        key={ingredient.sys.id}
                        className="flex items-center gap-3"
                      >
                        {ingredient.image && (
                          <img
                            src={ingredient.image.url}
                            alt={ingredient.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <span>
                          {ingredient.quantity && `${ingredient.quantity} `}
                          {ingredient.unit && `${ingredient.unit} `}
                          {ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Steps List */}
            {recipe.steps && recipe.steps.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Vaiheet</h2>
                <ol className="list-decimal list-inside space-y-2">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="text-lg">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Instructions Rich Text */}
            {recipe.instructions && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Ohjeet</h2>
                <div className="prose max-w-none">
                  <Markdown
                    content={recipe.instructions.json}
                    assets={recipe.instructions.links.assets.block}
                  />
                </div>
              </div>
            )}

            {/* Preparation Steps Rich Text */}
            {recipe.preparationSteps && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Valmistusohjeet</h2>
                <div className="prose max-w-none">
                  <Markdown
                    content={recipe.preparationSteps.json}
                    assets={recipe.preparationSteps.links.assets.block}
                  />
                </div>
              </div>
            )}

            {/* Additional Images */}
            {recipe.imagesCollection &&
              recipe.imagesCollection.items.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">Kuvia</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recipe.imagesCollection.items.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={image.description || `Kuva ${index + 1}`}
                        className="w-full h-auto rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        <section className="mt-28 mb-24">
          <div className="container mx-auto px-5">
            <hr className="border-accent-2 mb-24" />
            <MoreRecipes moreRecipes={moreRecipes} />
          </div>
        </section>
      </main>
    </>
  );
}

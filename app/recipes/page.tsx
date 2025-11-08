import { draftMode } from "next/headers";
import Link from "next/link";
import { getAllRecipes } from "@/lib/api";
import CoverImage from "../cover-image";
import { Header } from "../components/Header";

export const metadata = {
  title: "Reseptit - Arkiapuri",
  description: "Kaikki Arkiapuri-blogin reseptit",
};

function RecipeCard({
  title,
  heroImage,
  slug,
  steps,
  category,
  mealType,
  difficultyLevel,
  preparationTime,
}: {
  title: string;
  heroImage: any;
  slug: string;
  steps?: string[];
  category?: string;
  mealType?: string;
  difficultyLevel?: string;
  preparationTime?: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:shadow-purple-100 hover:-translate-y-1 transition-all duration-300 group">
      {heroImage && (
        <div className="aspect-video relative">
          <CoverImage
            title={title}
            slug={slug}
            url={heroImage.url}
            description={heroImage.description}
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex gap-2 mb-3 flex-wrap">
          {category && (
            <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
              {category}
            </span>
          )}
          {mealType && (
            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              {mealType}
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold mb-3 leading-tight">
          <Link
            href={`/recipes/${slug}`}
            className="hover:text-primary transition-colors"
          >
            {title}
          </Link>
        </h3>
        <div className="flex gap-4 text-sm text-gray-600 mb-4">
          {preparationTime && (
            <div className="flex items-center gap-1">
              <span>⏱️</span>
              <span>{preparationTime}</span>
            </div>
          )}
          {difficultyLevel && (
            <div className="flex items-center gap-1">
              <span>📊</span>
              <span>{difficultyLevel}</span>
            </div>
          )}
        </div>
        {steps && steps.length > 0 && (
          <p className="text-gray-600 leading-relaxed">
            {steps.length} vaihetta
          </p>
        )}
      </div>
    </div>
  );
}

export default async function ReseptitPage() {
  const { isEnabled } = await draftMode();
  const allRecipes = await getAllRecipes(isEnabled);

  return (
    <>
      <Header
        pageTitle="Reseptit"
        coverImage={{
          url: "https://images.ctfassets.net/2pij69ehhf4n/zPEHlmsQhspd7kMidWon0/e3253ea774aeba21f1965e766009a598/pexels-xmtnguyen-2664216.jpg",
          description: "Reseptit header image",
        }}
      />
      <main className="flex-grow animate-fade-in">
        <div className="container mx-auto px-5 pt-10 md:pt-14 pb-10 md:pb-14">
          <div className="max-w-3xl mx-auto">
            <div className="text-xl leading-relaxed mb-10 md:mb-12">
              Tutustu kaikkiin Arkiapuri-blogin resepteihin. Löydät täältä
              helppoja ja maukkaita reseptejä arjen ruoanlaittoon.
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {allRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-stagger">
                {allRecipes.map((recipe) => (
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
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">Ei vielä reseptejä.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

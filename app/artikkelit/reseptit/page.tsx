import { draftMode } from "next/headers";
import { getAllRecipes } from "@/lib/api";
import { Header } from "../../components/Header";
import Script from "next/script";
import { AdCard } from "./AdCard";
import { RecipeCard } from "../../components/RecipeCard";

export const metadata = {
  title: "Reseptit - Arkiapuri",
  description: "Kaikki Arkiapuri-blogin reseptit",
};

export default async function ReseptitPage() {
  const { isEnabled } = await draftMode();
  const allRecipes = await getAllRecipes(isEnabled);

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6513624758655536"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
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
                {allRecipes.reduce((acc: JSX.Element[], recipe, index) => {
                  acc.push(
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
                  );

                  // Insert ad after every 3rd recipe
                  if ((index + 1) % 3 === 0 && index < allRecipes.length - 1) {
                    acc.push(<AdCard key={`ad-${index}`} />);
                  }

                  return acc;
                }, [])}
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

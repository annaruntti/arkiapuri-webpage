interface RecipeSchemaProps {
  recipe: {
    title: string;
    heroImage?: {
      url: string;
      description?: string;
    };
    preparationTime?: string;
    difficultyLevel?: string;
    ingredientsCollection?: {
      items: Array<{
        name: string;
        quantity?: string;
        unit?: string;
      }>;
    };
    steps?: string[];
    category?: string;
  };
}

export function RecipeSchema({ recipe }: RecipeSchemaProps) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": recipe.title,
    "image": recipe.heroImage?.url ? [recipe.heroImage.url] : [],
    "description": recipe.heroImage?.description || recipe.title,
    "keywords": recipe.category || "",
    "recipeCategory": recipe.category || "",
    "recipeCuisine": "Suomalainen",
    "prepTime": recipe.preparationTime ? `PT${recipe.preparationTime}` : undefined,
    "recipeIngredient": recipe.ingredientsCollection?.items.map(
      (ingredient) =>
        `${ingredient.quantity || ""} ${ingredient.unit || ""} ${ingredient.name}`.trim()
    ) || [],
    "recipeInstructions": recipe.steps?.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": step,
    })) || [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


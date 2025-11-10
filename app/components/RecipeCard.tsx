import Link from "next/link";
import CoverImage from "../cover-image";

interface RecipeCardProps {
  title: string;
  heroImage?: {
    url: string;
    description?: string;
  };
  slug: string;
  steps?: string[];
  category?: string;
  mealType?: string;
  difficultyLevel?: string;
  preparationTime?: string;
}

export function RecipeCard({
  title,
  heroImage,
  slug,
  steps,
  category,
  mealType,
  difficultyLevel,
  preparationTime,
}: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:shadow-purple-100 hover:-translate-y-1 transition-all duration-300 group">
      {heroImage && (
        <div className="aspect-video relative">
          <CoverImage
            title={title}
            url={heroImage.url}
            description={heroImage.description}
            href={`/artikkelit/reseptit/${slug}`}
            objectPosition="center top"
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
            href={`/artikkelit/reseptit/${slug}`}
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


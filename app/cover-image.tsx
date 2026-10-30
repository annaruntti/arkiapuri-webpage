import ContentfulImage from "../lib/contentful-image";
import Link from "next/link";

type ClassValue =
  | string
  | false
  | null
  | undefined
  | Record<string, unknown>;

function cn(...classes: ClassValue[]) {
  return classes
    .flatMap((cls) => {
      if (!cls) return [];
      if (typeof cls === "string") return [cls];
      return Object.entries(cls)
        .filter(([, enabled]) => Boolean(enabled))
        .map(([name]) => name);
    })
    .join(" ");
}

export default function CoverImage({
  title,
  url,
  slug,
  description,
  objectPosition = "center",
  href,
}: {
  title: string;
  url: string;
  slug?: string;
  description?: string;
  objectPosition?: string;
  href?: string;
}) {
  const image = (
    <ContentfulImage
      alt={description || "Artikkelin kansikuva"}
      priority
      width={2000}
      height={1000}
      className={cn("shadow-small w-full h-auto", {
        "hover:shadow-medium hover:scale-105 transition-all duration-300 ease-out":
          slug,
      })}
      src={url}
      style={{
        objectFit: "cover",
        objectPosition: objectPosition,
        maxWidth: "100%",
        height: "auto",
        minHeight: "200px",
      }}
    />
  );

  const linkHref = href || (slug ? `/posts/${slug}` : null);

  return (
    <div
      className="sm:mx-0 relative overflow-hidden cover-image"
      style={{ minHeight: "200px" }}
    >
      {linkHref ? (
        <Link href={linkHref} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}

import ContentfulImage from "../lib/contentful-image";
import Link from "next/link";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CoverImage({
  title,
  url,
  slug,
  description,
}: {
  title: string;
  url: string;
  slug?: string;
  description?: string;
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
        maxWidth: "100%",
        height: "auto",
        minHeight: "200px",
      }}
    />
  );

  return (
    <div
      className="sm:mx-0 relative overflow-hidden cover-image"
      style={{ minHeight: "200px" }}
    >
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}

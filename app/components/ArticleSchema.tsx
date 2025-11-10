interface ArticleSchemaProps {
  post: {
    title: string;
    excerpt: string;
    date: string;
    author: {
      name: string;
    };
    coverImage?: {
      url: string;
      description?: string;
    };
  };
  url: string;
}

export function ArticleSchema({ post, url }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage?.url || "",
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Arkiapuri",
      logo: {
        "@type": "ImageObject",
        url: "https://arkiapuri.fi/arkiapuri-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

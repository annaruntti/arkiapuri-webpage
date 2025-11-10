import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/draft/"],
    },
    sitemap: "https://arkiapuri.fi/sitemap.xml",
  };
}


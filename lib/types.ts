import { Document, Block, Inline, Text } from "@contentful/rich-text-types";

export interface ContentfulAsset {
  sys: {
    id: string;
  };
  url: string;
  description?: string;
}

export interface ContentfulAuthor {
  name: string;
  profilePicture?: {
    url: string;
  };
}

export interface ContentfulContent {
  json: Document;
  links: {
    assets: {
      block: ContentfulAsset[];
    };
  };
}

export interface ContentfulPost {
  slug: string;
  title: string;
  coverImage: {
    url: string;
    description?: string;
  };
  heroImage: {
    url: string;
    description?: string;
  };
  date: string;
  author: {
    name: string;
    profilePicture: {
      url: string;
    };
  };
  excerpt: string;
  content: {
    json: any;
    links: {
      assets: {
        block: {
          sys: {
            id: string;
          };
          url: string;
          description: string;
        }[];
      };
    };
  };
}

export interface ContentfulPage {
  slug: string;
  title: string;
  introduction?: string;
  content: ContentfulContent;
  heroImage?: {
    url: string;
    description?: string;
  };
  coverImage?: {
    url: string;
    description?: string;
  };
}

export interface ContentfulResponse<T> {
  data: {
    postCollection?: {
      items: T[];
    };
    pageCollection?: {
      items: T[];
    };
  };
}

// Helper types for rich text content
export type RichTextNode = Block | Inline | Text;
export type RichTextBlock = Block;
export type RichTextInline = Inline;
export type RichTextText = Text;

import { ContentfulPost, ContentfulPage, ContentfulResponse } from "./types";

const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
    description
  }
  heroImage {
    url
    description
  }
  date
  author {
    ... on Author {
      name
      profilePicture {
        url
      }
    }
  }
  excerpt
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

async function fetchGraphQL<T>(
  query: string,
  preview = false
): Promise<ContentfulResponse<T>> {
  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            preview
              ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
        },
        body: JSON.stringify({ query }),
        next: { tags: ["posts"] },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Contentful API error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(
        `Contentful API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Contentful API response:", data);
    return data;
  } catch (error) {
    console.error("Error in fetchGraphQL:", error);
    throw error;
  }
}

function extractPost(
  fetchResponse: ContentfulResponse<ContentfulPost>
): ContentfulPost | null {
  return fetchResponse?.data?.postCollection?.items?.[0] || null;
}

function extractPostEntries(
  fetchResponse: ContentfulResponse<ContentfulPost>
): ContentfulPost[] {
  return fetchResponse?.data?.postCollection?.items || [];
}

export async function getPreviewPostBySlug(
  slug: string | null
): Promise<ContentfulPost | null> {
  const entry = await fetchGraphQL<ContentfulPost>(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractPost(entry);
}

export async function getAllPosts(
  isDraftMode: boolean
): Promise<ContentfulPost[]> {
  try {
    const entries = await fetchGraphQL<ContentfulPost>(
      `query {
        postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
          isDraftMode ? "true" : "false"
        }, limit: 5) {
          items {
            ${POST_GRAPHQL_FIELDS}
          }
        }
      }`,
      isDraftMode
    );
    console.log("Contentful response:", entries);
    return extractPostEntries(entries);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean
): Promise<{ post: ContentfulPost | null; morePosts: ContentfulPost[] }> {
  const entry = await fetchGraphQL<ContentfulPost>(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL<ContentfulPost>(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? "true" : "false"
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}

export async function getAllPages(
  isDraftMode: boolean
): Promise<ContentfulPage[]> {
  const entries = await fetchGraphQL<ContentfulPage>(
    `query {
      pageCollection(where: { slug_exists: true }, preview: ${
        isDraftMode ? "true" : "false"
      }, limit: 5) {
        items {
          slug
          title
          introduction
          heroImage {
            url
            description
          }
          coverImage {
            url
            description
          }
          content {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  description
                }
              }
            }
          }
        }
      }
    }`,
    isDraftMode
  );
  return entries?.data?.pageCollection?.items || [];
}

import {
  ContentfulPost,
  ContentfulPage,
  ContentfulRecipe,
  ContentfulResponse,
} from "./types";

/* Post GraphQL fields */

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

/* Recipe GraphQL fields */

const RECIPE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  category
  mealType
  difficultyLevel
  preparationTime
  heroImage {
    url
    description
  }
  steps
  instructions {
    json
  }
  preparationSteps {
    json
  }
`;

/* Recipe GraphQL fields with full details */

const RECIPE_GRAPHQL_FIELDS_FULL = `
  sys {
    id
  }
  title
  category
  mealType
  difficultyLevel
  preparationTime
  heroImage {
    url
    description
  }
  imagesCollection(limit: 10) {
    items {
      url
      description
    }
  }
  steps
  blogText {
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
  instructions {
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
  ingredientsCollection(limit: 20) {
    items {
      ... on Ingredients {
        sys {
          id
        }
        name
        image {
          url
          description
        }
        quantity
        unit
      }
    }
  }
  preparationSteps {
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

/* Page GraphQL fields */

const PAGE_GRAPHQL_FIELDS = `
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
  leftTextColumn
  rightVideoColumn {
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
export async function getAllPages(
  isDraftMode: boolean
): Promise<ContentfulPage[]> {
  const entries = await fetchGraphQL<ContentfulPage>(
    `query {
      pageCollection(where: { slug_exists: true }, preview: ${
        isDraftMode ? "true" : "false"
      }, limit: 5) {
        items {
          ${PAGE_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );

  return entries?.data?.pageCollection?.items || [];
}

/* Recipe functions */

function extractRecipe(
  fetchResponse: ContentfulResponse<ContentfulRecipe>
): ContentfulRecipe | null {
  const item = fetchResponse?.data?.recipesCollection?.items?.[0] || null;
  if (!item) return null;
  // Generate slug from title if not present
  return {
    ...item,
    slug:
      item.slug ||
      item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
  };
}

function extractRecipeEntries(
  fetchResponse: ContentfulResponse<ContentfulRecipe>
): ContentfulRecipe[] {
  const items = fetchResponse?.data?.recipesCollection?.items || [];
  // Generate slug from title if not present
  return items.map((item) => ({
    ...item,
    slug:
      item.slug ||
      item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
  }));
}

export async function getAllRecipes(
  isDraftMode: boolean
): Promise<ContentfulRecipe[]> {
  try {
    const entries = await fetchGraphQL<ContentfulRecipe>(
      `query {
        recipesCollection(limit: 50, preview: ${
          isDraftMode ? "true" : "false"
        }) {
          items {
            ${RECIPE_GRAPHQL_FIELDS}
          }
        }
      }`,
      isDraftMode
    );
    return extractRecipeEntries(entries);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export async function getRecipeAndMoreRecipes(
  slug: string,
  preview: boolean
): Promise<{
  recipe: ContentfulRecipe | null;
  moreRecipes: ContentfulRecipe[];
}> {
  // Fetch all recipes and find by generated slug
  const allRecipes = await getAllRecipes(preview);
  const recipe = allRecipes.find((r) => r.slug === slug) || null;
  const moreRecipes = allRecipes.filter((r) => r.slug !== slug).slice(0, 3);

  // If we found a recipe, fetch its full details
  if (recipe && recipe.sys?.id) {
    const entry = await fetchGraphQL<ContentfulRecipe>(
      `query {
        recipes(id: "${recipe.sys.id}", preview: ${
        preview ? "true" : "false"
      }) {
          ${RECIPE_GRAPHQL_FIELDS_FULL}
        }
      }`,
      preview
    );
    const fullRecipe = entry?.data
      ? {
          ...(entry.data as any).recipes,
          slug: recipe.slug,
        }
      : recipe;
    return {
      recipe: fullRecipe,
      moreRecipes,
    };
  }

  return {
    recipe,
    moreRecipes,
  };
}

export async function getPreviewRecipeBySlug(
  slug: string | null
): Promise<ContentfulRecipe | null> {
  const entry = await fetchGraphQL<ContentfulRecipe>(
    `query {
      recipesCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${RECIPE_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractRecipe(entry);
}

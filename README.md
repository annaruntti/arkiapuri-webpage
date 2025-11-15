# Arkiapuri Webpage

This is the official website for Arkiapuri, a tool that helps you manage everyday challenges in an easy and convenient way. The website is built with Next.js 14+ (App Router) and uses Contentful as a headless CMS for content management.

## Features

- Modern, responsive design with Tailwind CSS
- Recipe section with detailed recipe pages (`/artikkelit/reseptit`)
- Blog section for articles and posts (`/artikkelit/blogi`)
- Static page support for custom content
- Content management through Contentful CMS
- Draft mode for content preview
- On-demand revalidation for instant content updates
- Optimized GraphQL queries for efficient content loading
- Responsive image handling with Next.js Image component
- SEO optimization with structured data (Schema.org)
- Sitemap and robots.txt generation
- Google AdSense integration
- Parallax effects and scroll animations
- Deployed on Netlify

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm package manager
- Contentful account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/arkiapuri-webpage.git
cd arkiapuri-webpage
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
CONTENTFUL_PREVIEW_SECRET=your_preview_secret
CONTENTFUL_REVALIDATE_SECRET=your_revalidate_secret
```

4. Run the development server:

```bash
npm run dev
```

The site will be available at [http://localhost:3001](http://localhost:3001).

## Content Management

This project uses Contentful as a headless CMS. The content model includes:

### Content Types

- **Author**: Content type for blog post authors

  - name (Text)
  - profilePicture (Media)

- **Post**: Content type for blog posts

  - title (Text)
  - content (Rich Text)
  - excerpt (Text)
  - coverImage (Media)
  - heroImage (Media)
  - date (Date and Time)
  - slug (Text)
  - author (Reference to Author)

- **Page**: Content type for static pages

  - title (Text)
  - introduction (Long Text)
  - content (Rich Text)
  - slug (Text)
  - coverImage (Media)
  - heroImage (Media)
  - leftTextColumn (Long Text)
  - rightVideoColumn (Rich Text)

- **Recipe**: Content type for recipes

  - title (Text)
  - slug (Text) - Auto-generated from title if not provided
  - category (Text) - e.g., "Pääruoka", "Jälkiruoka"
  - mealType (Text) - e.g., "Lounas", "Illallinen"
  - difficultyLevel (Text) - e.g., "Helppo", "Keskivaikea"
  - preparationTime (Text) - e.g., "30 min"
  - heroImage (Media)
  - imagesCollection (Media, multiple)
  - blogText (Rich Text) - Introduction/story about the recipe
  - instructions (Rich Text) - General instructions
  - steps (Text, multiple) - Step-by-step instructions list
  - preparationSteps (Rich Text) - Detailed preparation instructions
  - ingredientsCollection (Reference to Ingredients, multiple)

- **Ingredients**: Content type for recipe ingredients
  - name (Text)
  - quantity (Text)
  - unit (Text)
  - image (Media)

### GraphQL Query Optimization

The project implements optimized GraphQL queries to handle Contentful's complexity limits:

- Queries use specific field selection to minimize complexity
- Recipe queries have separate fields for list view (`RECIPE_GRAPHQL_FIELDS`) and detail view (`RECIPE_GRAPHQL_FIELDS_FULL`)
- Collections are limited appropriately (e.g., ingredients: 20, images: 10, posts: 5)
- Asset fields are included for proper image handling
- Preview mode support for draft content

## Project Structure

```
app/
├── [slug]/                      # Dynamic pages (from Contentful Page content type)
├── api/                         # API routes for draft mode and revalidation
├── artikkelit/                  # Articles section
│   ├── blogi/                   # Blog articles listing
│   └── reseptit/                # Recipe section
│       ├── [slug]/              # Individual recipe pages
│       └── page.tsx             # Recipe listing page
├── components/                  # Reusable components
│   ├── ArticleSchema.tsx        # Schema.org for articles
│   ├── RecipeSchema.tsx         # Schema.org for recipes
│   ├── RecipeCard.tsx           # Recipe card component
│   ├── Header.tsx               # Site header
│   ├── Navigation.tsx           # Navigation component
│   ├── ParallaxElement.tsx      # Parallax effect component
│   └── ScrollAnimation.tsx      # Scroll animation component
├── posts/                       # Blog posts
│   └── [slug]/                  # Individual post pages
├── recipes/                     # Alternative recipe route
├── layout.tsx                   # Root layout
├── page.tsx                     # Homepage
├── robots.ts                    # Robots.txt configuration
└── sitemap.ts                   # Sitemap generation

lib/
├── api.ts                       # Contentful API functions
├── types.ts                     # TypeScript type definitions
├── markdown.tsx                 # Rich text renderer
├── contentful-image.tsx         # Image component for Contentful
├── useParallax.ts               # Parallax hook
└── useScrollAnimation.ts        # Scroll animation hook
```

## Development Notes

### Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS with Typography plugin
- **CMS**: Contentful (GraphQL API)
- **Deployment**: Netlify
- **Language**: TypeScript
- **Rich Text Rendering**: Contentful Rich Text React Renderer

### Image Handling

- Images are optimized using Next.js Image component
- Responsive image sizing with aspect ratio containers
- Proper handling of both horizontal and vertical images
- Background color fill for image containers
- Remote image patterns configured for `images.ctfassets.net`

### Contentful Integration

- GraphQL API for efficient data fetching
- Draft mode support for content preview via `/api/draft` and `/api/enable-draft`
- On-demand revalidation for instant updates via `/api/revalidate`
- Error handling for API responses
- Automatic slug generation for recipes from titles

### SEO & Schema.org

The project implements structured data for better SEO:

- **RecipeSchema**: Implements Schema.org Recipe type with:
  - Recipe name, image, description
  - Preparation time
  - Ingredients list
  - Step-by-step instructions (HowToStep)
  - Recipe category and cuisine
- **ArticleSchema**: For blog posts and articles
- **Sitemap**: Automatically generated at `/sitemap.xml`
- **Robots.txt**: Configured to allow crawling with proper exclusions

### Semantic HTML Structure

The project follows strict semantic HTML structure for better accessibility and SEO:

- Proper nesting of `<header>`, `<main>`, and `<footer>` elements
- Layout components handle the overall page structure
- Page components focus on content organization
- Rich text content is properly structured with semantic elements
- Navigation and header components are consistently placed outside of main content

### Component Organization

The project uses a clear component hierarchy:

- Layout components (`app/layout.tsx`, `app/posts/[slug]/layout.tsx`) handle page structure
- Page components handle specific page content
- Reusable components (`Header`, `Navigation`, etc.) are placed in `app/components`
- Rich text rendering is handled by a dedicated `Markdown` component

### Accessibility Features

- Semantic HTML structure for better screen reader support
- Proper heading hierarchy
- Alt text for images
- ARIA labels where needed
- Responsive design for all screen sizes

## Deployment

The project is deployed on Netlify with the following configuration:

### Netlify Configuration (`netlify.toml`)

- **Build command**: `npm install --legacy-peer-deps && npm run build`
- **Node version**: 20
- **Plugin**: `@netlify/plugin-nextjs` for Next.js support
- **Functions**: Configured to include necessary dependencies

### Environment Variables

Make sure to set the following environment variables in your Netlify dashboard:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
CONTENTFUL_PREVIEW_SECRET=your_preview_secret
CONTENTFUL_REVALIDATE_SECRET=your_revalidate_secret
```

### Deployment Triggers

- Automatic deployments on push to `main` branch
- Manual deployments via Netlify dashboard
- Content updates trigger revalidation via webhook to `/api/revalidate`

## Available Scripts

- `npm run dev` - Start development server (runs on port 3000 by default)
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run setup` - Run Contentful setup script

## API Routes

- `/api/draft` - Enable draft mode for previewing unpublished content
- `/api/enable-draft` - Alternative draft mode endpoint
- `/api/disable-draft` - Disable draft mode
- `/api/revalidate` - Trigger on-demand revalidation of content

## License

This is a private project for Arkiapuri.

## Domain

- Production: https://arkiapuri.fi

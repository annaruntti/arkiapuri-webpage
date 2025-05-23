# Arkiapuri Webpage

This is the official website for Arkiapuri, a tool that helps you manage everyday challenges in an easy and convenient way. The website is built with Next.js and uses Contentful as a headless CMS for content management.

## Features

- Modern, responsive design
- Blog section for updates and announcements
- Content management through Contentful
- Draft mode for content preview
- On-demand revalidation for instant content updates
- Optimized GraphQL queries for efficient content loading
- Responsive image handling with Next.js Image component

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
  - date (Date and Time)
  - slug (Text)
  - author (Reference to Author)

- **Page**: Content type for static pages
  - title (Text)
  - introduction (Long Text)
  - content (Rich Text)
  - slug (Text)
  - coverImage (Media)
  - heroImage

### GraphQL Query Optimization

The project implements optimized GraphQL queries to handle Contentful's complexity limits:

- Queries are limited to 5 items per collection to stay within Contentful's complexity limits
- Essential fields are selected to minimize query complexity
- Asset fields are included for proper image handling
- Pagination is implemented for larger content sets

## Development Notes

### Image Handling

- Images are optimized using Next.js Image component
- Responsive image sizing with aspect ratio containers
- Proper handling of both horizontal and vertical images
- Background color fill for image containers

### Contentful Integration

- GraphQL API for efficient data fetching
- Draft mode support for content preview
- On-demand revalidation for instant updates
- Error handling for API responses

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

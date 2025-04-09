# Arkiapuri Webpage

This is the official website for Arkiapuri, a tool that helps you manage everyday challenges in an easy and convenient way. The website is built with Next.js and uses Contentful as a headless CMS for content management.

## Features

- Modern, responsive design
- Blog section for updates and announcements
- Content management through Contentful
- Draft mode for content preview
- On-demand revalidation for instant content updates

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm package manager
- Contentful account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/arkiapuri-webpage.git
cd arkiapuri-webpage
```

2. Install dependencies:

```bash
pnpm install
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
pnpm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Content Management

This project uses Contentful as a headless CMS. The content model includes:

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

## Deployment

The website can be deployed to Vercel:

1. Push your code to GitHub
2. Import the project to Vercel
3. Set up the environment variables in Vercel
4. Deploy

## License

[Your chosen license]

## Contact

[Your contact information]

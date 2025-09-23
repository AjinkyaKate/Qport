# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js marketing site for Qport, a heavy cargo route intelligence platform. The project is built as a single-page React application with TypeScript support.

## Development Commands

```bash
# Install dependencies
yarn

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linting
yarn lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 12 with React 18
- **Styling**: TailwindCSS with custom configuration
- **Language**: JavaScript with TypeScript support
- **Animations**: GSAP for animations
- **Email**: Nodemailer for contact form
- **Themes**: next-themes for dark mode support

### Project Structure
```
├── components/          # Reusable UI components
│   ├── Header/         # Navigation header
│   ├── Footer/         # Site footer
│   ├── Button/         # Button component
│   ├── Cursor/         # Custom cursor component
│   └── ...
├── pages/              # Next.js pages
│   ├── index.js        # Main landing page
│   ├── _app.js         # App wrapper with ThemeProvider
│   └── api/            # API routes
│       └── book-demo.ts # Demo booking endpoint
├── data/               # JSON data files
│   └── portfolio.json  # Site configuration and content
├── styles/             # Global styles
│   └── globals.css     # Main stylesheet with custom CSS
└── public/assets/      # Static assets and images
```

### Key Configuration
- **TailwindCSS**: Custom breakpoints defined (mob: 375px, tablet: 768px, laptop: 1024px, desktop: 1280px, laptopl: 1440px)
- **TypeScript**: Configured with strict: false for gradual migration
- **Next.js**: Image optimization enabled for images.unsplash.com domain
- **Assets**: Environment variable `NEXT_PUBLIC_ASSETS_BASE_URL` controls asset path for GitHub Pages deployment

### Data Management
The site content is driven by `data/portfolio.json` which contains:
- Site configuration (name, cursor settings)
- Social links
- Project data (currently portfolio projects)
- About text and resume PDF path

### Styling Approach
- Utility-first with TailwindCSS
- Custom CSS classes in globals.css for specific components
- Responsive design with mobile-first approach
- Dark mode support via next-themes

### API Integration
- Contact form at `/api/book-demo` handles demo requests
- Email functionality via Nodemailer
- Form includes simulated mode for development environments
- Google Analytics integration via dataLayer events

### Asset Management
- Static assets stored in `public/assets/`
- Dynamic asset base URL for deployment flexibility
- Optimized images with lazy loading
- Video support for hero section demos

## Important Notes

- The project is transitioning from portfolio template to marketing site
- Component structure follows atomic design principles
- Form validation includes both client and server-side checks
- Mobile-responsive design with device shell styling for demos
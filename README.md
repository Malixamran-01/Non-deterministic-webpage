# Procedural Web Roulette

A React + Vite site that procedurally generates a completely new UI, content and UX on every refresh. Supports seed-based sharing, probability-weighted components, external API content, and safe external HTML/CSS fetching via a serverless proxy.

## Features

- **Procedural Generation**: Every refresh creates a unique website layout, color scheme, and content
- **Seed-based Sharing**: Share exact layouts using seed URLs (e.g., `?seed=4f3a9b0c`)
- **Probability Engine**: Weighted random selection for themes, layouts, and components
- **Multiple Palettes**: Pastel, neon, muted, dark, and monochrome color schemes
- **Responsive Design**: Works on desktop and mobile devices
- **External Content**: Safe fetching of external APIs via serverless proxy

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **State Management**: React hooks
- **Styling**: Tailwind CSS with CSS variables for theming
- **Images**: Picsum Photos for random images
- **Deployment**: Vercel (recommended) or Netlify

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173

## Seed Feature

The seed feature allows you to reproduce exact UI configurations:

- **Seed Format**: 8-character hex string (e.g., `4f3a9b0c`)
- **Share URLs**: `https://yourdomain.com/?seed=4f3a9b0c`
- **Deterministic**: Same seed always produces the same layout

## Probability Engine

The generator uses weighted random selection for:

- **Page Purpose**: blog (30%), landing (20%), product (10%), meme (15%), fact (25%)
- **Navbar Style**: top (40%), centered (30%), side (20%), none (10%)
- **Color Palette**: pastel (25%), neon (10%), muted (30%), dark (20%), mono (15%)
- **Font Choice**: system (40%), serif (15%), display (25%), mono (20%)

## Color Palettes

- **Pastel**: Soft, gentle colors
- **Neon**: Bright, vibrant colors
- **Muted**: Subtle, professional colors
- **Dark**: Dark theme colors
- **Mono**: Monochrome grayscale

## Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Lint code
npm run lint
```

## Deployment

### Vercel (Recommended)

1. Push repository to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `API_PROXY_KEY`: Random secret for serverless proxy
   - `VITE_UNSPLASH_ACCESS_KEY`: For image variants (optional)
4. Deploy automatically

### Netlify

1. Push repository to GitHub
2. Connect repository to Netlify
3. Create Netlify Function for API proxy
4. Set environment variables in Netlify dashboard
5. Deploy

## Security

- **Content Security Policy**: Restrict scripts and styles to trusted domains
- **Rate Limiting**: Apply rate limits on serverless proxy
- **HTML Sanitization**: Sanitize external HTML before injection
- **Secret Management**: Keep API keys in environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details


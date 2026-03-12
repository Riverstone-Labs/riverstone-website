# Riverstone Labs Website

A premium, modern AI consultancy landing page built with Next.js 15, Tailwind CSS v4, and shadcn/ui.

## Features

- **Particle Network Animation**: Canvas-based animated background with 50-80 particles
- **Dark Theme Design**: Premium aesthetic with custom color palette
- **Responsive Layout**: Mobile-first design with breakpoints for all devices
- **Scroll Animations**: Framer Motion powered reveal animations
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML and ARIA labels
- **SEO Optimized**: Meta tags, structured data, sitemap, and robots.txt
- **Performance**: Optimized for 90+ Lighthouse scores

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter, JetBrains Mono

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Riverstone-Labs/riverstone-website.git
cd riverstone-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build for Production

```bash
npm run build
npm start
```

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build and run manually
docker build -t riverstone-website .
docker run -p 3000:3000 riverstone-website
```

## Project Structure

```
app/
├── sections/          # Page sections (Hero, Problem, etc.)
├── components/        # Reusable components (ParticleNetwork, ScrollReveal)
├── page.tsx           # Main page
├── layout.tsx         # Root layout with fonts and metadata
├── globals.css        # Global styles and design system
├── robots.ts          # Robots.txt generation
└── sitemap.ts         # Sitemap generation

components/ui/         # shadcn/ui components
public/               # Static assets
```

## Sections

1. **Hero**: Full-height with particle network animation
2. **Problem**: Why AI projects fail (3-card grid)
3. **Approach**: Process timeline with phases
4. **Services**: 6 service cards in grid
5. **Proof**: Case studies and testimonial carousel
6. **About**: Company capabilities and approach
7. **Content**: Blog preview cards
8. **CTA**: Contact form and newsletter
9. **Footer**: Links and social icons

## Design System

### Colors
- Background Primary: `#0a0a0f`
- Background Secondary: `#12121a`
- Background Card: `#1a1a24`
- Accent Primary: `#00d4ff` (electric blue)
- Accent Secondary: `#f59e0b` (amber)
- Text Primary: `#ffffff`
- Text Secondary: `#a1a1aa`
- Text Muted: `#71717a`
- Border: `rgba(255, 255, 255, 0.1)`

### Typography
- Headlines: Inter, 700-800 weight
- Body: Inter, 400-500 weight
- Code: JetBrains Mono

## Testing

```bash
# Run unit tests
npm test

# Run E2E tests with Playwright
npm run test:e2e

# Run all tests
npm run test:all
```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

Proprietary - Riverstone Labs

## Contact

- Email: hello@riverstone.ai
- Website: [https://riverstone.ai](https://riverstone.ai)

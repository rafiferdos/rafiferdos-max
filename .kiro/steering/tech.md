# Technology Stack

## Core Framework

- **Next.js 15.4.1** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

## Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Component library (New York style)
- **class-variance-authority** - Component variant management
- **tailwind-merge & clsx** - Conditional class merging
- **next-themes** - Theme switching functionality

## Icons & Graphics

- **Lucide React** - Primary icon library
- **React Icons** - Additional icon sets
- **Tabler Icons** - Extended icon collection

## Animation & Effects

- **Motion** (Framer Motion) - Animation library for smooth transitions
- **tw-animate-css** - Additional Tailwind animations

## Package Management

- **pnpm** - Fast, disk space efficient package manager

## Development Tools

- **ESLint** - Code linting with Next.js and TypeScript rules
- **PostCSS** - CSS processing

## Common Commands

### Development

```bash
pnpm dev          # Start development server on localhost:3000
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Package Management

```bash
pnpm install      # Install dependencies
pnpm add <pkg>    # Add new dependency
pnpm add -D <pkg> # Add dev dependency
```

## Build Configuration

- TypeScript strict mode enabled
- Path aliases configured (`@/*` maps to `./src/*`)
- ES2017 target with modern module resolution
- Next.js App Router with incremental builds

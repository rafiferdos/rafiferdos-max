# Project Structure

## Root Directory

```
├── .kiro/              # Kiro AI assistant configuration
├── public/             # Static assets (images, icons)
├── src/                # Source code
└── Configuration files (package.json, tsconfig.json, etc.)
```

## Source Code Organization (`src/`)

### App Directory (`src/app/`)

- **Next.js App Router** structure
- `layout.tsx` - Root layout with providers and global setup
- `page.tsx` - Homepage component
- `globals.css` - Global styles and Tailwind imports
- `favicon.ico` - Site favicon

### Components (`src/components/`)

#### Component Categories

- **`ui/`** - Reusable UI components and effects

  - 3D effects, animations, text effects
  - Interactive elements (buttons, cards, docks)
  - Visual effects (aurora, particles, gradients)
  - All components follow shadcn/ui patterns

- **`navigation/`** - Navigation-related components

  - Floating dock implementation
  - Smooth scroll provider
  - Navigation wrappers and configurations

- **`providers/`** - React context providers
  - Theme provider for dark/light mode
  - Other global state management

#### Component Conventions

- Use TypeScript with proper type definitions
- Export components from index files where appropriate
- Follow shadcn/ui naming and structure patterns
- Implement responsive design by default
- Use the `cn()` utility for conditional classes

### Libraries (`src/lib/`)

- **`utils.ts`** - Utility functions (includes `cn()` for class merging)
- **`util.ts`** - Additional utility functions
- Keep utilities pure and well-typed

## Configuration Files

### Component Library

- **`components.json`** - shadcn/ui configuration
  - New York style variant
  - Path aliases for clean imports
  - Lucide icons as default icon library

### Styling

- **Tailwind CSS 4** with CSS variables
- **Zinc** as base color palette
- Custom CSS variables for theming

## Import Patterns

- Use path aliases: `@/components`, `@/lib`, `@/ui`
- Prefer named exports over default exports for utilities
- Import UI components from their direct paths
- Use barrel exports (`index.ts`) for component groups

## File Naming

- Use kebab-case for component files: `hero-section.tsx`
- Use camelCase for utility files: `utils.ts`
- Use PascalCase for component names in code
- Prefix UI components appropriately (e.g., `3d-card.tsx`)

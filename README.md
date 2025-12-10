# XORS Starter

A [Next.js](https://nextjs.org/) project starter for XORS projects, initialized with common directory structures and base technologies to standardize our build approach.

## Technology

- [Biome](https://biomejs.dev/) for linting and formatting
- [bun](https://bun.sh/) for package management and running scripts
- [clsx](https://github.com/lukeed/clsx) for constructing className strings conditionally
- [CVA](https://cva.style/docs) for organizing variant styles
- [ShadCN](https://ui.shadcn.com/docs/installation/next) for starter components built with Radix+Tailwind
- [svgr](https://react-svgr.com) for transforming SVGs into React components
- [Tailwind](https://tailwindcss.com/) for CSS
- [Vitest](https://vitest.dev/) for unit tests

## Getting Started

1. Clone this repo
2. [Install bun](https://bun.sh/docs/installation)
3. Run `bun install` to install dependencies
4. Run `npx vercel link` + `npx vercel env pull .env.local` to retrieve .env files from Vercel (if any)
5. Run `bun dev` to launch an in-browser development environment at [http://localhost:3000](http://localhost:3000)

## Configuration

Core config options can be handled in the `app/config` files. Config options include:

- App Settings (Name, Description, URL)
- Environment settings

See `.env.example` for required environment variables.

## Directory Structure

- `/components` - React components
- `/config` - App configuration
- `/constants` - Constant values (breakpoints, themes, URLs)
- `/hooks` - Custom React hooks
- `/fonts` - Font files and configuration
- `/providers` - React context providers
- `/types` - TypeScript type definitions
- `/utils` - Utility functions (new additions should include tests)

## Custom Files

- `not-found.tsx` to customize the 404 page

## Fonts

Font configurations live in `/fonts`. Instances of Google Fonts and locally-served fonts should all be configured in `fonts.ts`, where you can find additional information about configuring CSS variables and Tailwind styles for each typeface.

## Icons

We generate React components for icons using SVGR. Just drop raw SVGs into `/icon-svg`, and run `bun build-icons` to rebuild the icon set in `app/components/icons/generated`. If you have pre-built or custom icon components, drop them in `app/components/icons/`. Be aware that components in `icons/generated` will be overwritten by the build process, so any custom modifications should be done to the source SVGs or in a custom icon component.

## Barrel Exports

Barrel exports simplify imports and improve code organization. This starter uses them extensively.

By creating an `index.ts` file for a directory, multiple modules or components can be exported from a single entry point:

**index.ts**

```typescript
export * from "@/components/foo";
export * from "@/components/bar";
export * from "@/components/foo-bar";
```

Barrel exports allow multiple modules or components to be imported with a single statement:

```typescript
import { FooComponent, BarComponent, FooBarComponent } from "@/components";
```

This approach keeps imports concise and avoids specifying individual paths for each module or component.

You can still import components individually if necessary:

```typescript
import FooComponent from "@/components/foo";
import BarComponent from "@/components/bar";
import FooBarComponent from "@/components/foo-bar";
```

## Installing ShadCN Components

ShadCN is a component starter library whose components can all be directly installed locally rather than as an NPM package, so we have the ability to modify the files directly. Each component is installed separately on an as-needed basis. Core components will be installed into `@/components/ui`

For example, here we install the `<Button>` component:

```bash
bunx shadcn-ui@latest add button
```

## Scripts

```bash
bun dev          # Start development server
bun turbo        # Start dev server with Turbopack
bun build        # Build for production
bun start        # Start production server
bun test         # Run tests
bun test:watch   # Run tests in watch mode
bun lint         # Lint code with Biome
bun lint:fix     # Fix lint issues
bun format       # Check formatting
bun format:fix   # Fix formatting issues
bun build-icons  # Generate icon components from SVGs
bun type-check   # Run TypeScript type checking
```

# XORS Starter

A full-stack monorepo starter for XORS projects, featuring a [Next.js](https://nextjs.org/) frontend and [Elysia](https://elysiajs.com/) backend, initialized with common directory structures and base technologies to standardize our build approach.

## Technology

### Shared

- [Biome](https://biomejs.dev/) for linting and formatting
- [bun](https://bun.sh/) for package management, workspaces, and running scripts
- [TypeScript](https://www.typescriptlang.org/) for type safety

### Frontend (`web/`)

- [clsx](https://github.com/lukeed/clsx) for constructing className strings conditionally
- [CVA](https://cva.style/docs) for organizing variant styles
- [Next.js](https://nextjs.org/) for React framework
- [ShadCN](https://ui.shadcn.com/docs/installation/next) for starter components built with Radix+Tailwind
- [svgr](https://react-svgr.com) for transforming SVGs into React components
- [Tailwind](https://tailwindcss.com/) for CSS
- [Vitest](https://vitest.dev/) for unit tests

### Backend (`server/`)

- [Elysia](https://elysiajs.com/) for the API server (Bun-native, TypeScript-first)
- [@elysiajs/cors](https://elysiajs.com/plugins/cors.html) for CORS handling
- [@elysiajs/swagger](https://elysiajs.com/plugins/swagger.html) for API documentation

## Getting Started

1. Clone this repo
2. [Install bun](https://bun.sh/docs/installation)
3. Run `bun install` to install all dependencies (workspaces handle both packages)
4. Run `npx vercel link` + `npx vercel env pull web/.env.local` to retrieve .env files from Vercel (if any)
5. Run `bun dev` to start both frontend and backend:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:3001](http://localhost:3001)
   - Swagger Docs: [http://localhost:3001/swagger](http://localhost:3001/swagger)

## Project Structure

```
├── web/              # Next.js frontend
│   ├── app/          # Next.js app directory
│   ├── public/       # Static assets
│   └── ...
├── server/           # Elysia backend
│   └── src/
│       ├── index.ts      # Server entry point
│       └── routes/       # API route modules
├── package.json      # Root workspace config
└── README.md
```

## Frontend (`web/`)

### Directory Structure

- `/app/components` - React components
- `/app/config` - App configuration
- `/app/constants` - Constant values (breakpoints, themes, URLs)
- `/app/hooks` - Custom React hooks
- `/app/fonts` - Font files and configuration
- `/app/providers` - React context providers
- `/app/types` - TypeScript type definitions
- `/app/utils` - Utility functions (new additions should include tests)

### Configuration

Core config options can be handled in the `web/app/config` files. Config options include:

- App Settings (Name, Description, URL)
- Environment settings

See `.env.example` for required environment variables.

### Custom Files

- `not-found.tsx` to customize the 404 page

### Fonts

Font configurations live in `/app/fonts`. Instances of Google Fonts and locally-served fonts should all be configured in `fonts.ts`, where you can find additional information about configuring CSS variables and Tailwind styles for each typeface.

### Icons

We generate React components for icons using SVGR. Just drop raw SVGs into `/icon-svg`, and run `bun run --filter web build-icons` to rebuild the icon set in `app/components/icons/generated`. If you have pre-built or custom icon components, drop them in `app/components/icons/`. Be aware that components in `icons/generated` will be overwritten by the build process, so any custom modifications should be done to the source SVGs or in a custom icon component.

### Installing ShadCN Components

ShadCN is a component starter library whose components can all be directly installed locally rather than as an NPM package, so we have the ability to modify the files directly. Each component is installed separately on an as-needed basis. Core components will be installed into `@/components/ui`

For example, here we install the `<Button>` component:

```bash
cd web && bunx shadcn-ui@latest add button
```

## Backend (`server/`)

### Directory Structure

- `/src/index.ts` - Server entry point with middleware setup
- `/src/routes/` - API route modules (organized by feature)

### API Routes

Routes are organized as Elysia plugins in `/src/routes/`. Each route file exports an Elysia instance with a prefix:

```typescript
import { Elysia, t } from "elysia";

export const exampleRoutes = new Elysia({ prefix: "/example" })
  .get("/", () => ({ message: "Hello" }))
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  });
```

Then import and use in `index.ts`:

```typescript
import { exampleRoutes } from "./routes/example";

const app = new Elysia().use(exampleRoutes).listen(3001);
```

### Included Routes

- `GET /health` - Health check endpoint
- `GET /health/ready` - Readiness check
- `GET /users` - List all users (example)
- `GET /users/:id` - Get user by ID (example)
- `POST /users` - Create a user (example)

### API Documentation

Swagger documentation is automatically generated and available at [http://localhost:3001/swagger](http://localhost:3001/swagger) when the server is running.

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

## Scripts

### Root (runs across all packages)

```bash
bun dev          # Start both frontend and backend in parallel
bun dev:web      # Start only the frontend
bun dev:server   # Start only the backend
bun build        # Build all packages for production
bun test         # Run tests in all packages
bun lint         # Lint all packages with Biome
bun lint:fix     # Fix lint issues in all packages
bun format       # Check formatting in all packages
bun format:fix   # Fix formatting issues in all packages
bun type-check   # Run TypeScript type checking in all packages
bun clean        # Remove all node_modules
```

### Frontend (`web/`)

```bash
bun run --filter web dev           # Start Next.js dev server
bun run --filter web turbo         # Start dev server with Turbopack
bun run --filter web build         # Build for production
bun run --filter web start         # Start production server
bun run --filter web test          # Run tests
bun run --filter web test:watch    # Run tests in watch mode
bun run --filter web build-icons   # Generate icon components from SVGs
```

### Backend (`server/`)

```bash
bun run --filter server dev        # Start Elysia dev server with hot reload
bun run --filter server build      # Build for production
bun run --filter server start      # Start production server
bun run --filter server test       # Run tests
```

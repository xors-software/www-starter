# XORS Starter

A full-stack monorepo starter for XORS projects: a [Next.js](https://nextjs.org/) frontend and a [Hono](https://hono.dev/) API on Node 24. It includes Postgres, OpenTelemetry and CI, so every project starts with the same build approach.

## Technology

### Shared

- [Biome](https://biomejs.dev/) 2.6 for linting and formatting
- [bun](https://bun.sh/) for package management, workspaces and scripts
- [TypeScript](https://www.typescriptlang.org/) 7 (the native compiler) for type checking
- [Vitest](https://vitest.dev/) 5 for tests in both workspaces
- GitHub Actions CI (`.github/workflows/ci.yml`)

### Frontend (`web/`)

- [clsx](https://github.com/lukeed/clsx) for constructing className strings conditionally
- [CVA](https://cva.style/docs) for organizing variant styles
- [Next.js](https://nextjs.org/) 16 for React framework
- [ShadCN](https://ui.shadcn.com/docs/installation/next) for starter components built with Radix+Tailwind
- [svgr](https://react-svgr.com) for transforming SVGs into React components
- [Tailwind](https://tailwindcss.com/) 4 for CSS

### Backend (`server/`)

- [Hono](https://hono.dev/) on [Node 24](https://nodejs.org/), which runs the TypeScript sources directly. There is no build step.
- [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi): one zod schema gives request validation, response types and the OpenAPI document
- [Scalar](https://github.com/scalar/scalar) for the API reference page at `/docs`
- [Kysely](https://kysely.dev/) and [pg](https://node-postgres.com/) for Postgres, with plain SQL migrations
- [OpenTelemetry](https://opentelemetry.io/) for traces, metrics and logs, and [pino](https://getpino.io/) for structured logs
- [grafana/otel-lgtm](https://github.com/grafana/docker-otel-lgtm) in `docker-compose.yml` for local Grafana, Prometheus, Tempo and Loki

## Getting Started

1. Clone this repo.
2. [Install bun](https://bun.sh/docs/installation), [Node 24](https://nodejs.org/) (see `.node-version`) and Docker.
3. Run `bun install` to install all dependencies. Workspaces handle both packages.
4. Run `bun infra:up` to start Postgres and Grafana in Docker.
5. Run `bun db:migrate` to create the tables.
6. Optional: copy `.env.example` to `web/.env.local` and `server/.env.example` to `server/.env`. The server defaults already match `docker-compose.yml`. To pull env files from Vercel instead, run `npx vercel link` and `npx vercel env pull web/.env.local`.
7. Run `bun dev` to start both apps:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - API: [http://localhost:3001](http://localhost:3001)
   - API reference: [http://localhost:3001/docs](http://localhost:3001/docs). The OpenAPI document is at `/openapi.json`.
   - Grafana: [http://localhost:3002](http://localhost:3002), with no login. Open **Dashboards → App → API overview**.

If a port is already in use, override it. For example: `WEB_PORT=3100 PORT=3101 bun dev`. Docker host ports read `POSTGRES_PORT`, `GRAFANA_PORT`, `OTLP_GRPC_PORT` and `OTLP_HTTP_PORT`. If you change them, also set `DATABASE_URL` and `OTEL_EXPORTER_OTLP_ENDPOINT` in `server/.env`.

## Project Structure

```
├── web/                    # Next.js frontend
│   ├── app/                # Next.js app directory
│   ├── public/             # Static assets
│   └── ...
├── server/                 # Hono API (Node 24)
│   ├── src/
│   │   ├── index.ts        # Entry point: config, pool, listen, graceful shutdown
│   │   ├── app.ts          # createApp(): middleware, routes, OpenAPI, errors
│   │   ├── telemetry.ts    # OpenTelemetry preload (node --import)
│   │   ├── lib/            # config, logger, db, Kysely table types
│   │   ├── middleware/     # RED metrics
│   │   └── routes/         # One module per feature
│   ├── migrations/         # Plain SQL, applied in filename order
│   ├── scripts/migrate.ts  # Migration runner
│   ├── test/               # Tests against a real Postgres
│   └── Dockerfile
├── ops/grafana/            # Provisioned dashboard and alert rules
├── docker-compose.yml      # Postgres + grafana/otel-lgtm
├── .github/workflows/ci.yml
└── package.json            # Root workspace config
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

The server runs on Node 24 with `node --watch src/index.ts` in development, and the same command without `--watch` in production. Node strips the types at load time, so there is no compile step and no `dist/`. Type checking is a separate step (`bun type-check`, and in CI). Because Node does not transform code, use only TypeScript syntax that can be erased: no `enum`, no `namespace` and no parameter properties. The `erasableSyntaxOnly` option in `tsconfig.json` enforces this. Relative imports use the `.ts` extension.

Bun is still the package manager and script runner. Hono also runs on Bun if a project does not need OpenTelemetry.

### API Routes

Each feature has a route module in `src/routes/` that registers its routes on the app. Define routes with `createRoute`. The same zod schemas validate the request, type the handler and produce the OpenAPI document:

```typescript
import { createRoute, z } from "@hono/zod-openapi"
import type { App, Deps } from "../app.ts"

const Greeting = z.object({ message: z.string() }).openapi("Greeting")

const hello = createRoute({
	method: "get",
	path: "/hello/{name}",
	tags: ["Example"],
	request: { params: z.object({ name: z.string().min(1) }) },
	responses: {
		200: {
			content: { "application/json": { schema: Greeting } },
			description: "OK",
		},
	},
})

export function registerExampleRoutes(app: App, { db }: Deps) {
	app.openapi(hello, (c) => {
		const { name } = c.req.valid("param")
		return c.json({ message: `Hello, ${name}` }, 200)
	})
}
```

Then call `registerExampleRoutes(app, deps)` in `createApp()` in `src/app.ts`. If a request fails validation, the API returns a 400 response with `{ error: "invalid_request", issues: [...] }`.

### Included Routes

- `GET /health`: liveness
- `GET /health/ready`: readiness. It runs `select 1` against Postgres and returns 503 if that fails.
- `GET /version`: the running build (`SERVICE_VERSION`, `GIT_SHA`). A deploy is complete when this endpoint returns the new SHA.
- `GET /users`, `GET /users/{id}`, `POST /users`: an example resource backed by Postgres
- `GET /openapi.json` and `GET /docs`: the OpenAPI 3.1 document and the Scalar reference page

### Configuration

`src/lib/config.ts` reads the environment with a zod schema. If a value is invalid, the server does not start, and the error names the variable. `server/.env.example` lists every variable with its default value.

### Database

- **Queries:** Kysely, typed by `src/lib/schema.ts`. Keep `schema.ts` in step with the migrations by hand.
- **Migrations:** plain SQL files in `server/migrations/`, named `NNNN_description.sql`. The runner (`scripts/migrate.ts`) applies each file once, in filename order and in its own transaction. It stores a checksum for each file and stops with an error if an applied file was changed: write a new migration instead. A Postgres advisory lock stops concurrent runs, such as two deploys, from racing.
- **Running migrations:** `bun db:migrate` locally. In a deployment, run `node scripts/migrate.ts` on every deploy, before the new version takes traffic.

### Tests

Server tests run against a real Postgres, never a mock. Vitest's global setup (`test/global-setup.ts`) creates a throwaway database for each run, migrates it, and drops it at the end. `test/harness.ts` builds the real app on that database. Tests call the app in-process with `app.request()`, and `reset()` empties the tables between tests.

The tests connect to `TEST_DATABASE_ADMIN_URL`, which defaults to `postgres://xors:xors@localhost:5432/postgres` (the Postgres in `docker-compose.yml`). In CI, a Postgres service container supplies it.

### Observability

`src/telemetry.ts` is preloaded with `node --import`, so instrumentation starts before the app loads. It exports traces, metrics and logs over OTLP/HTTP to `OTEL_EXPORTER_OTLP_ENDPOINT` (default `http://localhost:4318`, the LGTM container).

- **Instrumentations:** `http`, `undici` (outbound `fetch`), `pg`, `pino` and the Node.js runtime. The list is explicit on purpose. The auto-instrumentations bundle loads about 40 libraries.
- **Logs:** `logger` from `src/lib/logger.ts`. The pino instrumentation adds `trace_id` and `span_id` to each record and sends it to Loki, so each log line links to its trace.
- **Metrics:** `src/middleware/metrics.ts` records the `app.http.request.duration` histogram with labels for method, route template (for example `/users/:id`) and status. This gives request rate, error rate and latency per route. The middleware also renames each server span to `METHOD /route` and returns the trace ID in the `x-trace-id` response header. Postgres pool usage is the `app.db.pool.connections` gauge.
- **Dashboard and alerts:** `ops/grafana/` provisions the **API overview** dashboard (HTTP, database, runtime and logs) and two starter alert rules: p95 above 500 ms and 5xx above 1%. Set the thresholds from your own targets.
- **Switching off:** set `OTEL_SDK_DISABLED=true` to run without telemetry. Tests do this.

For a deployed environment, point `OTEL_EXPORTER_OTLP_ENDPOINT` at your collector or vendor endpoint (Grafana Cloud, Datadog Agent, Azure Monitor, and so on), and set `OTEL_SERVICE_NAME`, `ENVIRONMENT` and `GIT_SHA`.

### Docker Image

`server/Dockerfile` builds from the repo root with `docker build -f server/Dockerfile --build-arg GIT_SHA=$(git rev-parse HEAD) .`. The image contains the production dependencies and the TypeScript sources, and runs on `node:24`.

## CI

`.github/workflows/ci.yml` runs on every pull request and on every push to `main`:

1. `biome ci .` (lint and format)
2. `bun run type-check` (TypeScript 7, both workspaces)
3. `bun run test` (web tests, and server tests against a Postgres 17 service container)
4. A build of the server image (not pushed)

Run the first three locally with `bun run check`. It needs the Postgres from `bun infra:up`.

## Barrel Exports

Barrel exports simplify imports and improve code organization. This starter uses them extensively.

By creating an `index.ts` file for a directory, multiple modules or components can be exported from a single entry point:

**index.ts**

```typescript
export * from "@/components/foo"
export * from "@/components/bar"
export * from "@/components/foo-bar"
```

Barrel exports allow multiple modules or components to be imported with a single statement:

```typescript
import { FooComponent, BarComponent, FooBarComponent } from "@/components"
```

This approach keeps imports concise and avoids specifying individual paths for each module or component.

## Scripts

Use `bun run test` and `bun run build`, not `bun test` and `bun build`. Those two names run Bun's built-in test runner and bundler, not the package scripts.

### Root (runs across all packages)

```bash
bun dev              # Start the frontend and the API in parallel
bun dev:web          # Start only the frontend
bun dev:server       # Start only the API
bun run build        # Build the frontend for production (the API has no build step)
bun run test         # Run tests in all packages
bun run check        # Biome + type-check + tests, as in CI
bun lint             # Lint all packages with Biome
bun lint:fix         # Fix lint issues in all packages
bun format           # Check formatting in all packages
bun format:fix       # Fix formatting issues in all packages
bun type-check       # Type-check all packages with TypeScript 7
bun infra:up         # Start Postgres and Grafana (docker compose)
bun infra:down       # Stop them (data is kept in Docker volumes)
bun db:migrate       # Apply pending migrations
bun clean            # Remove node_modules and .next
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
bun run --filter server dev        # node --watch, with the telemetry preload
bun run --filter server start      # The production command
bun run --filter server db:migrate # Apply pending migrations
bun run --filter server test       # Run tests (needs Postgres)
```

## Stack Decisions (November 2026)

These measurements were taken on Apple Silicon on November 16, 2026:

| What                                                          | Before          | After             |
| ------------------------------------------------------------- | --------------- | ----------------- |
| `tsc --noEmit`, `web/`                                        | 1.10 s (TS 5.9) | 0.56 s (TS 7.0.2) |
| `tsc --noEmit`, a 2.9K-line Hono/Kysely/OpenTelemetry backend | 0.91 s (TS 5.9) | 0.21 s (TS 7.0.2) |
| Install, warm cache                                           | pnpm 1.6 s      | bun 0.17 s        |

- **Hono on Node 24 instead of Elysia on Bun.** Elysia runs only on Bun. On Bun, OpenTelemetry cannot instrument `Bun.serve` or `fetch`, and vendor distributions such as Azure Monitor's need Node. Hono runs on both.
- **Bun stays as the package manager.** It is the fastest installer we measured.
- **Biome instead of ESLint.** Type-aware typescript-eslint rules need the TypeScript 7.1 programmatic API. Biome does not depend on it.
- **Kysely with SQL migrations instead of an ORM.** This is enough for most projects, and the queries stay visible.
- **Not adopted yet:** Oxlint's type-aware mode (still alpha), and Bun as the server runtime for projects that need OpenTelemetry or Azure support.

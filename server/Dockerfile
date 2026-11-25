# syntax=docker/dockerfile:1.7
# Build from the repo root: docker build -f server/Dockerfile .
#
# No compile step: Node 24 runs the TypeScript sources directly (type stripping),
# so the image is production dependencies plus source. Type checking runs in CI.

FROM oven/bun:1.3.14 AS deps
WORKDIR /app
COPY package.json bun.lock ./
COPY server/package.json server/
COPY web/package.json web/
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile --production --filter server

FROM node:24.13.0-bookworm-slim
ENV NODE_ENV=production
WORKDIR /app/server
COPY --from=deps /app/node_modules /app/node_modules
COPY server/package.json ./
COPY server/migrations ./migrations
COPY server/scripts ./scripts
COPY server/src ./src
ARG GIT_SHA=unknown
ENV GIT_SHA=${GIT_SHA} SERVICE_VERSION=${GIT_SHA}
USER node
EXPOSE 3001
# Run migrations as a separate deploy step with: node scripts/migrate.ts
CMD ["node", "--import", "./src/telemetry.ts", "src/index.ts"]

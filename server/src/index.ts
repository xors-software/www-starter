import { serve } from "@hono/node-server"
import { createApp } from "./app.ts"
import { loadConfig } from "./lib/config.ts"
import { createDb, createPool } from "./lib/db.ts"
import { flushTelemetry, logger } from "./lib/logger.ts"

const config = loadConfig()
const pool = createPool({
	url: config.DATABASE_URL,
	max: config.DATABASE_POOL_MAX,
	statementTimeoutMs: config.DATABASE_STATEMENT_TIMEOUT_MS,
	name: process.env.OTEL_SERVICE_NAME ?? "xors-api",
})
const app = createApp({ config, db: createDb(pool) })

const server = serve({ fetch: app.fetch, port: config.PORT }, (info) => {
	logger.info(
		{ port: info.port, version: config.SERVICE_VERSION },
		`API listening on http://localhost:${info.port} (docs at /docs)`,
	)
})

// Stop accepting connections, let in-flight requests finish, close the pool,
// flush telemetry. `node --watch` also sends SIGTERM before each restart.
let closing = false
for (const signal of ["SIGTERM", "SIGINT"] as const) {
	process.on(signal, () => {
		if (closing) return
		closing = true
		logger.info({ signal }, "shutting down")
		server.close(async () => {
			await pool.end()
			await flushTelemetry()
			process.exit(0)
		})
		setTimeout(() => process.exit(1), 10_000).unref()
	})
}

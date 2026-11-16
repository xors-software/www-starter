import { OpenAPIHono } from "@hono/zod-openapi"
import { Scalar } from "@scalar/hono-api-reference"
import { cors } from "hono/cors"
import { HTTPException } from "hono/http-exception"
import { secureHeaders } from "hono/secure-headers"
import type { Config } from "./lib/config.ts"
import type { Db } from "./lib/db.ts"
import { logger } from "./lib/logger.ts"
import { redMetrics } from "./middleware/metrics.ts"
import { registerHealthRoutes } from "./routes/health.ts"
import { registerUserRoutes } from "./routes/users.ts"

export interface Deps {
	config: Config
	db: Db
}

export type App = OpenAPIHono

/** Builds the app without listening, so tests can call `app.request()` in-process. */
export function createApp(deps: Deps): App {
	const app = new OpenAPIHono({
		// Shape of every 400 caused by a failed zod schema.
		defaultHook: (result, c) => {
			if (!result.success) {
				return c.json(
					{
						error: "invalid_request",
						issues: result.error.issues.map((i) => ({
							path: i.path,
							message: i.message,
						})),
					},
					400,
				)
			}
		},
	})

	app.use("*", redMetrics())
	app.use("*", secureHeaders())
	app.use(
		"*",
		cors({
			origin: deps.config.CORS_ORIGINS.split(",").map((s) => s.trim()),
			credentials: true,
			exposeHeaders: ["x-trace-id"],
			maxAge: 600,
		}),
	)

	registerHealthRoutes(app, deps)
	registerUserRoutes(app, deps)

	app.doc31("/openapi.json", {
		openapi: "3.1.0",
		info: { title: "XORS API", version: deps.config.SERVICE_VERSION },
	})
	app.get("/docs", Scalar({ url: "/openapi.json", pageTitle: "XORS API" }))

	app.notFound((c) => c.json({ error: "not_found" }, 404))
	app.onError((err, c) => {
		if (err instanceof HTTPException) {
			return c.json({ error: err.message }, err.status)
		}
		logger.error({ err, path: c.req.path }, "unhandled error")
		return c.json({ error: "internal_error" }, 500)
	})

	return app
}

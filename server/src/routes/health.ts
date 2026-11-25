import { createRoute, z } from "@hono/zod-openapi"
import { sql } from "kysely"
import type { App, Deps } from "../app.ts"

const Status = z
	.object({ status: z.string(), timestamp: z.string() })
	.openapi("HealthStatus")

const Readiness = z
	.object({
		status: z.enum(["ready", "unavailable"]),
		checks: z.object({
			database: z.object({ ok: z.boolean(), ms: z.number().optional() }),
		}),
	})
	.openapi("Readiness")

const Version = z
	.object({ version: z.string(), sha: z.string(), environment: z.string() })
	.openapi("Version")

const live = createRoute({
	method: "get",
	path: "/health",
	tags: ["Health"],
	summary: "Liveness: the process is up",
	responses: {
		200: {
			content: { "application/json": { schema: Status } },
			description: "OK",
		},
	},
})

const ready = createRoute({
	method: "get",
	path: "/health/ready",
	tags: ["Health"],
	summary: "Readiness: the process can reach its database",
	responses: {
		200: {
			content: { "application/json": { schema: Readiness } },
			description: "Ready",
		},
		503: {
			content: { "application/json": { schema: Readiness } },
			description: "Not ready",
		},
	},
})

const version = createRoute({
	method: "get",
	path: "/version",
	tags: ["Health"],
	summary: "The deployed build. A deploy is done when this returns its SHA.",
	responses: {
		200: {
			content: { "application/json": { schema: Version } },
			description: "OK",
		},
	},
})

export function registerHealthRoutes(app: App, { config, db }: Deps) {
	app.openapi(live, (c) =>
		c.json({ status: "ok", timestamp: new Date().toISOString() }, 200),
	)

	app.openapi(ready, async (c) => {
		const t0 = performance.now()
		try {
			await sql`select 1`.execute(db)
			const ms = Math.round(performance.now() - t0)
			return c.json(
				{ status: "ready" as const, checks: { database: { ok: true, ms } } },
				200,
			)
		} catch {
			return c.json(
				{
					status: "unavailable" as const,
					checks: { database: { ok: false } },
				},
				503,
			)
		}
	})

	app.openapi(version, (c) =>
		c.json(
			{
				version: config.SERVICE_VERSION,
				sha: config.GIT_SHA,
				environment: config.ENVIRONMENT,
			},
			200,
		),
	)
}

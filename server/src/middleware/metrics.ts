import { metrics, trace } from "@opentelemetry/api"
import type { Context, MiddlewareHandler } from "hono"
import { matchedRoutes } from "hono/route"

const requestDuration = metrics
	.getMeter("app-http")
	.createHistogram("app.http.request.duration", {
		unit: "s",
		description: "API request duration, by method, route template and status",
	})

function routeOf(c: Context): string {
	return (
		matchedRoutes(c).findLast((r) => r.method !== "ALL")?.path ?? "unmatched"
	)
}

/**
 * RED metrics (rate, errors, duration) from one histogram. Labels use the route
 * template (`/users/:id`), not the raw path, so label cardinality stays bounded.
 * Also renames the HTTP server span to `METHOD /route` and returns the trace ID
 * in `x-trace-id`, so a client can quote it in a bug report.
 */
export function redMetrics(): MiddlewareHandler {
	return async (c, next) => {
		const t0 = performance.now()
		const span = trace.getActiveSpan()
		if (span) c.header("x-trace-id", span.spanContext().traceId)
		try {
			await next()
		} finally {
			const route = routeOf(c)
			requestDuration.record((performance.now() - t0) / 1000, {
				"http.request.method": c.req.method,
				"http.route": route,
				"http.response.status_code": c.res.status,
			})
			span?.updateName(`${c.req.method} ${route}`)
			span?.setAttribute("http.route", route)
		}
	}
}

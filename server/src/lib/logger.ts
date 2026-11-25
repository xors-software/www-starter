import pino from "pino"

// The pino instrumentation (see telemetry.ts) adds trace_id and span_id to every
// record and forwards records to the OTLP log exporter. In Grafana, each log line
// links to its trace.
export const logger = pino({
	level: process.env.LOG_LEVEL ?? "info",
	base: {
		service: process.env.OTEL_SERVICE_NAME ?? "xors-api",
		env: process.env.ENVIRONMENT ?? "local",
	},
	redact: {
		paths: [
			"req.headers.authorization",
			"req.headers.cookie",
			"*.password",
			"*.secret",
			"*.token",
		],
		censor: "[redacted]",
	},
})

export type Logger = typeof logger

/** Flushes pending spans, metrics and logs. A no-op when telemetry is off. */
export async function flushTelemetry(): Promise<void> {
	await globalThis.__otelShutdown?.()
}

// Preloaded with `node --import ./src/telemetry.ts` so instrumentation is registered
// before any application module is evaluated. Exports OTLP over HTTP. Locally the
// target is grafana/otel-lgtm from docker-compose.yml; in a deployed environment,
// point OTEL_EXPORTER_OTLP_ENDPOINT at your collector or vendor endpoint.
//
// Set OTEL_SDK_DISABLED=true to turn telemetry off (the API still runs).
import { register } from "import-in-the-middle/register-hooks.mjs"

if (process.env.OTEL_SDK_DISABLED !== "true") {
	// ESM hook: lets instrumentations patch modules loaded with `import`.
	register()

	const { HttpInstrumentation } = await import(
		"@opentelemetry/instrumentation-http"
	)
	const { PgInstrumentation } = await import(
		"@opentelemetry/instrumentation-pg"
	)
	const { PinoInstrumentation } = await import(
		"@opentelemetry/instrumentation-pino"
	)
	const { RuntimeNodeInstrumentation } = await import(
		"@opentelemetry/instrumentation-runtime-node"
	)
	const { UndiciInstrumentation } = await import(
		"@opentelemetry/instrumentation-undici"
	)
	const { OTLPLogExporter } = await import(
		"@opentelemetry/exporter-logs-otlp-proto"
	)
	const { OTLPMetricExporter } = await import(
		"@opentelemetry/exporter-metrics-otlp-proto"
	)
	const { OTLPTraceExporter } = await import(
		"@opentelemetry/exporter-trace-otlp-proto"
	)
	const { resourceFromAttributes } = await import("@opentelemetry/resources")
	const { BatchLogRecordProcessor } = await import("@opentelemetry/sdk-logs")
	const { AggregationType, InstrumentType, PeriodicExportingMetricReader } =
		await import("@opentelemetry/sdk-metrics")
	const { NodeSDK } = await import("@opentelemetry/sdk-node")

	// Histogram buckets in seconds, for every instrument with "duration" in its name.
	const latencyBuckets = [
		0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 10,
	]

	const sdk = new NodeSDK({
		resource: resourceFromAttributes({
			"service.name": process.env.OTEL_SERVICE_NAME ?? "xors-api",
			"service.version": process.env.SERVICE_VERSION ?? "dev",
			"deployment.environment.name": process.env.ENVIRONMENT ?? "local",
			"vcs.ref.head.revision": process.env.GIT_SHA ?? "local",
		}),
		traceExporter: new OTLPTraceExporter(),
		metricReaders: [
			new PeriodicExportingMetricReader({
				exporter: new OTLPMetricExporter(),
				exportIntervalMillis: Number(
					process.env.OTEL_METRIC_EXPORT_INTERVAL ?? 15_000,
				),
			}),
		],
		views: [
			{
				instrumentType: InstrumentType.HISTOGRAM,
				instrumentName: "*duration*",
				aggregation: {
					type: AggregationType.EXPLICIT_BUCKET_HISTOGRAM,
					options: { boundaries: latencyBuckets },
				},
			},
		],
		logRecordProcessors: [
			new BatchLogRecordProcessor({ exporter: new OTLPLogExporter() }),
		],
		// Explicit list instead of @opentelemetry/auto-instrumentations-node, which
		// loads about 40 instrumentations and several cloud resource detectors.
		instrumentations: [
			new HttpInstrumentation({
				ignoreIncomingRequestHook: (req) =>
					req.url?.startsWith("/health") ?? false,
			}),
			new UndiciInstrumentation(),
			new PgInstrumentation({ requireParentSpan: true }),
			new PinoInstrumentation(),
			new RuntimeNodeInstrumentation(),
		],
	})

	sdk.start()

	let stopped: Promise<void> | undefined
	globalThis.__otelShutdown = () => {
		stopped ??= sdk.shutdown().catch(() => {})
		return stopped
	}
}

declare global {
	var __otelShutdown: (() => Promise<void>) | undefined
}

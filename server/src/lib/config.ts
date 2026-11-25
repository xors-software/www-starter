import { z } from "zod"

export const Environment = z.enum(["local", "test", "staging", "production"])
export type Environment = z.infer<typeof Environment>

const schema = z.object({
	ENVIRONMENT: Environment.default("local"),
	SERVICE_VERSION: z.string().default("dev"),
	GIT_SHA: z.string().default("local"),
	PORT: z.coerce.number().int().default(3001),
	LOG_LEVEL: z
		.enum(["trace", "debug", "info", "warn", "error", "silent"])
		.default("info"),

	DATABASE_URL: z.url().default("postgres://xors:xors@localhost:5432/xors"),
	DATABASE_POOL_MAX: z.coerce.number().int().min(1).default(10),
	DATABASE_STATEMENT_TIMEOUT_MS: z.coerce.number().int().default(5_000),

	// Comma-separated list of allowed browser origins.
	CORS_ORIGINS: z.string().default("http://localhost:3000"),
})

export type Config = z.infer<typeof schema>

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
	const parsed = schema.safeParse(env)
	if (!parsed.success) {
		const issues = parsed.error.issues.map(
			(i) => `  ${i.path.join(".")}: ${i.message}`,
		)
		throw new Error(`Invalid configuration:\n${issues.join("\n")}`)
	}
	return parsed.data
}

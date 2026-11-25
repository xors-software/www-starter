import { metrics } from "@opentelemetry/api"
import { Kysely, PostgresDialect } from "kysely"
import pg from "pg"
import type { Database } from "./schema.ts"

// int8 (bigint, count(*)) -> number. Safe below 2^53; change it if you store larger values.
pg.types.setTypeParser(pg.types.builtins.INT8, (v) => Number.parseInt(v, 10))

export type Db = Kysely<Database>

export function createPool(opts: {
	url: string
	max: number
	statementTimeoutMs: number
	name: string
}): pg.Pool {
	const pool = new pg.Pool({
		connectionString: opts.url,
		max: opts.max,
		idleTimeoutMillis: 30_000,
		connectionTimeoutMillis: 5_000,
		statement_timeout: opts.statementTimeoutMs,
		application_name: opts.name,
	})

	metrics
		.getMeter("app-db")
		.createObservableGauge("app.db.pool.connections", {
			description: "Connections in the pg pool, by state",
		})
		.addCallback((r) => {
			r.observe(pool.totalCount - pool.idleCount, {
				pool: opts.name,
				state: "used",
			})
			r.observe(pool.idleCount, { pool: opts.name, state: "idle" })
			r.observe(pool.waitingCount, { pool: opts.name, state: "waiting" })
		})

	return pool
}

export function createDb(pool: pg.Pool): Db {
	return new Kysely<Database>({ dialect: new PostgresDialect({ pool }) })
}

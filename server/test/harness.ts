import { sql } from "kysely"
import { inject } from "vitest"
import { createApp } from "../src/app.ts"
import { loadConfig } from "../src/lib/config.ts"
import { createDb, createPool } from "../src/lib/db.ts"

/** The real app on the run's test database, called in-process with `app.request()`. */
export function createHarness() {
	const config = loadConfig({
		ENVIRONMENT: "test",
		DATABASE_URL: inject("databaseUrl"),
		SERVICE_VERSION: "test",
		GIT_SHA: "abc123",
	})
	const pool = createPool({
		url: config.DATABASE_URL,
		max: 5,
		statementTimeoutMs: 10_000,
		name: "test",
	})
	const db = createDb(pool)
	const app = createApp({ config, db })

	async function call(path: string, init: RequestInit = {}) {
		const headers = new Headers(init.headers)
		if (init.body) headers.set("content-type", "application/json")
		const res = await app.request(path, { ...init, headers })
		const text = await res.text()
		return {
			status: res.status,
			headers: res.headers,
			body: text ? JSON.parse(text) : null,
		}
	}

	/** Empties every table except schema_migrations. Call it in `beforeEach`. */
	async function reset() {
		await sql`
			do $$
			declare t record;
			begin
				for t in
					select tablename from pg_tables
					where schemaname = 'public' and tablename <> 'schema_migrations'
				loop
					execute format('truncate table %I restart identity cascade', t.tablename);
				end loop;
			end $$
		`.execute(db)
	}

	return { app, db, call, reset, close: () => db.destroy() }
}

export type Harness = ReturnType<typeof createHarness>

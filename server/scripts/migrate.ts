// Applies migrations/*.sql in filename order, each in its own transaction.
//
// - A checksum is stored per file. Editing a migration after it ran is an error:
//   write a new migration instead.
// - A Postgres advisory lock makes concurrent runs (two deploys, two replicas)
//   wait for each other instead of racing.
//
// Run it on every deploy, before the new version takes traffic.
import { createHash } from "node:crypto"
import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"
import pg from "pg"

const LOCK_KEY = 72_026_110 // any constant; one migrator per database at a time

export async function migrate(
	databaseUrl: string,
	dir = join(import.meta.dirname, "../migrations"),
): Promise<{ applied: string[]; total: number }> {
	const client = new pg.Client({ connectionString: databaseUrl })
	await client.connect()
	try {
		await client.query("select pg_advisory_lock($1)", [LOCK_KEY])
		await client.query(`create table if not exists public.schema_migrations (
			version text primary key,
			checksum text not null,
			applied_at timestamptz not null default now()
		)`)

		const { rows } = await client.query<{ version: string; checksum: string }>(
			"select version, checksum from public.schema_migrations",
		)
		const done = new Map(rows.map((r) => [r.version, r.checksum]))
		const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()
		const applied: string[] = []

		for (const file of files) {
			const sql = await readFile(join(dir, file), "utf8")
			const checksum = createHash("sha256").update(sql).digest("hex")
			const prior = done.get(file)
			if (prior) {
				if (prior !== checksum) {
					throw new Error(`${file} was edited after it was applied`)
				}
				continue
			}
			await client.query("begin")
			try {
				await client.query(sql)
				await client.query(
					"insert into public.schema_migrations (version, checksum) values ($1, $2)",
					[file, checksum],
				)
				await client.query("commit")
				applied.push(file)
			} catch (err) {
				await client.query("rollback")
				throw new Error(`${file} failed: ${(err as Error).message}`)
			}
		}
		return { applied, total: files.length }
	} finally {
		await client
			.query("select pg_advisory_unlock($1)", [LOCK_KEY])
			.catch(() => {})
		await client.end()
	}
}

if (import.meta.main) {
	const { loadConfig } = await import("../src/lib/config.ts")
	const result = await migrate(loadConfig().DATABASE_URL)
	console.log(
		result.applied.length
			? `applied ${result.applied.join(", ")}`
			: `up to date (${result.total} migrations)`,
	)
}

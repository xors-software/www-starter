import { mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import pg from "pg"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { migrate } from "../scripts/migrate.ts"
import { createTempDatabase } from "./db.ts"

let db: Awaited<ReturnType<typeof createTempDatabase>>
let dir: string

beforeEach(async () => {
	db = await createTempDatabase("migrate_test")
	dir = await mkdtemp(join(tmpdir(), "migrations-"))
	await writeFile(join(dir, "0001_a.sql"), "create table a (id int);")
	await writeFile(join(dir, "0002_b.sql"), "create table b (id int);")
})

afterEach(async () => {
	await db.drop()
	await rm(dir, { recursive: true, force: true })
})

describe("migrate", () => {
	it("applies pending files once, in order", async () => {
		expect(await migrate(db.url, dir)).toEqual({
			applied: ["0001_a.sql", "0002_b.sql"],
			total: 2,
		})
		expect(await migrate(db.url, dir)).toEqual({ applied: [], total: 2 })
	})

	it("refuses a migration edited after it was applied", async () => {
		await migrate(db.url, dir)
		await writeFile(join(dir, "0001_a.sql"), "create table a (id bigint);")
		await expect(migrate(db.url, dir)).rejects.toThrow(/edited after/)
	})

	it("rolls back a failing file and keeps earlier ones", async () => {
		await writeFile(join(dir, "0003_bad.sql"), "create table c (id nope);")
		await expect(migrate(db.url, dir)).rejects.toThrow(/0003_bad.sql failed/)

		const client = new pg.Client({ connectionString: db.url })
		await client.connect()
		const { rows } = await client.query<{ version: string }>(
			"select version from schema_migrations order by version",
		)
		await client.end()
		expect(rows.map((r) => r.version)).toEqual(["0001_a.sql", "0002_b.sql"])
	})

	it("serializes concurrent runs with the advisory lock", async () => {
		const results = await Promise.all([
			migrate(db.url, dir),
			migrate(db.url, dir),
			migrate(db.url, dir),
		])
		expect(results.flatMap((r) => r.applied).sort()).toEqual([
			"0001_a.sql",
			"0002_b.sql",
		])
	})

	it("applies the repo's own migrations", async () => {
		const result = await migrate(db.url)
		expect(result.applied.length).toBe(result.total)
	})
})

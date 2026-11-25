import pg from "pg"

// A real Postgres: docker-compose.yml locally, a service container in CI.
export const ADMIN_URL =
	process.env.TEST_DATABASE_ADMIN_URL ??
	"postgres://xors:xors@localhost:5432/postgres"

/** Creates an empty database with a unique name. Call `drop()` when done. */
export async function createTempDatabase(prefix = "test") {
	const name = `${prefix}_${process.pid}_${Date.now()}_${Math.floor(Math.random() * 1e6)}`
	await adminQuery(`create database ${name}`)
	const url = new URL(ADMIN_URL)
	url.pathname = `/${name}`
	return {
		name,
		url: url.toString(),
		drop: () => adminQuery(`drop database if exists ${name} with (force)`),
	}
}

async function adminQuery(sql: string) {
	const client = new pg.Client({ connectionString: ADMIN_URL })
	await client.connect()
	try {
		await client.query(sql)
	} finally {
		await client.end()
	}
}

// One throwaway database per test run: created and migrated here, dropped at the
// end. Tests use the real schema and real queries; there are no database mocks.
import type { TestProject } from "vitest/node"
import { migrate } from "../scripts/migrate.ts"
import { createTempDatabase } from "./db.ts"

declare module "vitest" {
	export interface ProvidedContext {
		databaseUrl: string
	}
}

export default async function setup(project: TestProject) {
	const db = await createTempDatabase("xors_test")
	await migrate(db.url)
	project.provide("databaseUrl", db.url)
	return () => db.drop()
}

import { afterAll, beforeEach, describe, expect, it } from "vitest"
import { createHarness } from "./harness.ts"

const h = createHarness()
beforeEach(() => h.reset())
afterAll(() => h.close())

const createUser = (body: unknown) =>
	h.call("/users", { method: "POST", body: JSON.stringify(body) })

describe("health", () => {
	it("reports live, ready and the build", async () => {
		expect((await h.call("/health")).body.status).toBe("ok")

		const ready = await h.call("/health/ready")
		expect(ready.status).toBe(200)
		expect(ready.body.checks.database.ok).toBe(true)

		expect((await h.call("/version")).body).toEqual({
			version: "test",
			sha: "abc123",
			environment: "test",
		})
	})
})

describe("users", () => {
	it("creates, lists and fetches a user", async () => {
		const created = await createUser({
			name: "Ada",
			email: "Ada@Example.com",
		})
		expect(created.status).toBe(201)
		expect(created.body).toMatchObject({
			name: "Ada",
			email: "ada@example.com",
		})

		const list = await h.call("/users")
		expect(list.body).toHaveLength(1)

		const one = await h.call(`/users/${created.body.id}`)
		expect(one.status).toBe(200)
		expect(one.body).toEqual(created.body)
	})

	it("rejects a duplicate email with 409", async () => {
		await createUser({ name: "Ada", email: "ada@example.com" })
		const dup = await createUser({ name: "Ada 2", email: "ADA@example.com" })
		expect(dup.status).toBe(409)
		expect(dup.body.error).toBe("email_taken")
	})

	it("returns 400 with the failing fields for an invalid body", async () => {
		const res = await createUser({ name: "", email: "not-an-email" })
		expect(res.status).toBe(400)
		expect(res.body.error).toBe("invalid_request")
		const paths = res.body.issues.map((i: { path: string[] }) => i.path[0])
		expect(paths).toEqual(expect.arrayContaining(["name", "email"]))
	})

	it("returns 404 for an unknown ID and 400 for a malformed one", async () => {
		const missing = await h.call("/users/00000000-0000-4000-8000-000000000000")
		expect(missing.status).toBe(404)
		expect((await h.call("/users/not-a-uuid")).status).toBe(400)
	})
})

describe("openapi", () => {
	it("documents every route", async () => {
		const doc = await h.call("/openapi.json")
		expect(Object.keys(doc.body.paths)).toEqual(
			expect.arrayContaining([
				"/health",
				"/health/ready",
				"/version",
				"/users",
				"/users/{id}",
			]),
		)
		expect((await h.app.request("/docs")).status).toBe(200)
	})
})

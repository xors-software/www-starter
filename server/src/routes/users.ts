import { createRoute, z } from "@hono/zod-openapi"
import type { App, Deps } from "../app.ts"
import type { UserRow } from "../lib/schema.ts"

const User = z
	.object({
		id: z.uuid(),
		name: z.string(),
		email: z.email(),
		createdAt: z.iso.datetime(),
	})
	.openapi("User")

const CreateUser = z
	.object({
		name: z.string().trim().min(1).max(200),
		email: z.email().max(320),
	})
	.openapi("CreateUser")

const ErrorBody = z.object({ error: z.string() }).openapi("Error")

const IdParam = z.object({
	id: z.uuid().openapi({ param: { name: "id", in: "path" } }),
})

const json = <T extends z.ZodType>(schema: T, description: string) => ({
	content: { "application/json": { schema } },
	description,
})

const list = createRoute({
	method: "get",
	path: "/users",
	tags: ["Users"],
	summary: "List users, newest first",
	request: {
		query: z.object({
			limit: z.coerce.number().int().min(1).max(100).default(50),
		}),
	},
	responses: { 200: json(z.array(User), "Users") },
})

const get = createRoute({
	method: "get",
	path: "/users/{id}",
	tags: ["Users"],
	summary: "Get a user by ID",
	request: { params: IdParam },
	responses: {
		200: json(User, "The user"),
		404: json(ErrorBody, "No user with that ID"),
	},
})

const create = createRoute({
	method: "post",
	path: "/users",
	tags: ["Users"],
	summary: "Create a user",
	request: {
		body: { content: { "application/json": { schema: CreateUser } } },
	},
	responses: {
		201: json(User, "Created"),
		409: json(ErrorBody, "A user with that email exists"),
	},
})

const toUser = (row: UserRow) => ({
	id: row.id,
	name: row.name,
	email: row.email,
	createdAt: row.created_at.toISOString(),
})

const UNIQUE_VIOLATION = "23505"

export function registerUserRoutes(app: App, { db }: Deps) {
	app.openapi(list, async (c) => {
		const { limit } = c.req.valid("query")
		const rows = await db
			.selectFrom("users")
			.selectAll()
			.orderBy("created_at", "desc")
			.limit(limit)
			.execute()
		return c.json(rows.map(toUser), 200)
	})

	app.openapi(get, async (c) => {
		const { id } = c.req.valid("param")
		const row = await db
			.selectFrom("users")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst()
		if (!row) return c.json({ error: "user_not_found" }, 404)
		return c.json(toUser(row), 200)
	})

	app.openapi(create, async (c) => {
		const body = c.req.valid("json")
		try {
			const row = await db
				.insertInto("users")
				.values({ name: body.name, email: body.email.toLowerCase() })
				.returningAll()
				.executeTakeFirstOrThrow()
			return c.json(toUser(row), 201)
		} catch (err) {
			if ((err as { code?: string }).code === UNIQUE_VIOLATION) {
				return c.json({ error: "email_taken" }, 409)
			}
			throw err
		}
	})
}

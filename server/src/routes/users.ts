import { Elysia, t } from "elysia";

// Example user type
interface User {
	id: string;
	name: string;
	email: string;
	createdAt: string;
}

// In-memory store for demo purposes
const users: User[] = [
	{
		id: "1",
		name: "Alice",
		email: "alice@example.com",
		createdAt: new Date().toISOString(),
	},
	{
		id: "2",
		name: "Bob",
		email: "bob@example.com",
		createdAt: new Date().toISOString(),
	},
];

export const usersRoutes = new Elysia({ prefix: "/users" })
	.get("/", () => users, {
		detail: {
			summary: "Get all users",
			tags: ["Users"],
		},
	})
	.get(
		"/:id",
		({ params: { id }, set }) => {
			const user = users.find((u) => u.id === id);
			if (!user) {
				set.status = 404;
				return { message: "User not found" };
			}
			return user;
		},
		{
			params: t.Object({
				id: t.String(),
			}),
			detail: {
				summary: "Get user by ID",
				tags: ["Users"],
			},
		},
	)
	.post(
		"/",
		({ body }) => {
			const newUser: User = {
				id: String(users.length + 1),
				name: body.name,
				email: body.email,
				createdAt: new Date().toISOString(),
			};
			users.push(newUser);
			return newUser;
		},
		{
			body: t.Object({
				name: t.String({ minLength: 1 }),
				email: t.String({ format: "email" }),
			}),
			detail: {
				summary: "Create a new user",
				tags: ["Users"],
			},
		},
	);

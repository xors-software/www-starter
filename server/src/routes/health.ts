import { Elysia } from "elysia";

export const healthRoutes = new Elysia({ prefix: "/health" })
	.get("/", () => ({
		status: "ok",
		timestamp: new Date().toISOString(),
	}))
	.get("/ready", () => ({
		status: "ready",
		timestamp: new Date().toISOString(),
	}));

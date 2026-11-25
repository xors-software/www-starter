import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		environment: "node",
		globals: true,
		setupFiles: "./test/setup.ts",
	},
	plugins: [react()],
	resolve: {
		alias: { "@": "./app" },
	},
})

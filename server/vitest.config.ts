import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		include: ["test/**/*.test.ts"],
		globalSetup: ["test/global-setup.ts"],
		// Files share one database, so run them one at a time.
		fileParallelism: false,
		testTimeout: 30_000,
		hookTimeout: 60_000,
		env: { LOG_LEVEL: "silent", OTEL_SDK_DISABLED: "true" },
	},
})

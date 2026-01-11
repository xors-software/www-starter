import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: './test/setup.ts',
  },
  plugins: [react()],
  resolve: {
    alias: { "@": "./app" }
  }
})

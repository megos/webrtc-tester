import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'e2e/integration/*.spec.ts',
    supportFile: 'e2e/support/index.ts',
    fixturesFolder: false,
    projectId: '2tb9ip',
  },
})

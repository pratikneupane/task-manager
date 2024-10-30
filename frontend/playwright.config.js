import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/__tests__',
  timeout: 30 * 1000, 
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:5173',
  },
});

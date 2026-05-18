import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['list'],
    ['./reporters/diagnostic-reporter.ts']
  ],
  use: {
    baseURL: 'https://storedemo.testdino.com',
    trace: 'on-first-retry',
  },
});

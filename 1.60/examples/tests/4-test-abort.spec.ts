import { test, expect } from '@playwright/test';

test('blocks writes to shared environment', async ({ page }) => {
  await page.route('**/api/publish', route => {
    // Abort the test execution immediately if a guardrail is hit
    test.abort('Tests must not publish to the shared environment. Use the staging clone.');
    return route.abort();
  });

  await page.goto('https://storedemo.testdino.com');
  
  // Trigger a publish event to demonstrate abort
  // await page.getByRole('button', { name: 'Publish' }).click();
});

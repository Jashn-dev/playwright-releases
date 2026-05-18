import { test, expect } from '@playwright/test';

test('checkout API debugging', async ({ context }) => {
  // tracing.startHar() automatically scopes to the block via await using
  await using har = await context.tracing.startHar('trace.har', {
    urlFilter: '**/api/**',
  });

  const page = await context.newPage();
  await page.goto('https://storedemo.testdino.com');
  await page.getByTestId('header-menu-all-products').click();
  
  // HAR is finalized when `har` goes out of scope.
  await expect(page).toHaveURL(/.*products/);
});

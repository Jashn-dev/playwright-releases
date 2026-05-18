import { test, expect } from '@playwright/test';

test.describe('ARIA Snapshots', () => {
  test('full page accessibility check', async ({ page }) => {
    await page.goto('https://storedemo.testdino.com');

    // toMatchAriaSnapshot now works directly on the Page object
    await page.waitForLoadState('networkidle'); // wait for the main content to load
    await expect(page).toMatchAriaSnapshot(`
      - heading "Demo E-commerce Testing Store" [level=1]
      - paragraph: Embark on an electronic journey. Dive into our shop now!
      - heading "Feature Product" [level=1]
      - heading "New Arrivals" [level=1]
    `);
  });

  test('ARIA snapshot with layout info', async ({ page }) => {
    await page.goto('https://storedemo.testdino.com');

    // The boxes option includes layout coordinates
    const snapshot = await page.ariaSnapshot({ boxes: true });
    console.log(snapshot);
    // Output includes [box=x,y,width,height] per element
  });
});

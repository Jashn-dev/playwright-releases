import { test, expect } from '@playwright/test';

test('new locator and assertion options', async ({ page }) => {
  await page.goto('https://storedemo.testdino.com');

  // Match a button by its accessible description
  // await page.getByRole('button', {
  //   name: 'Delete',
  //   description: 'Removes the selected item permanently',
  // }).click();

  // Assert the ::before pseudo-element has specific styles
  // await expect(page.locator('.required-field')).toHaveCSS(
  //   'content',
  //   '"*"',
  //   { pseudo: '::before' }
  // );

  // Highlight with custom styling
  await page.locator('body').highlight({
    style: 'outline: 3px solid red; background: rgba(255,0,0,0.1);',
  });

  // Clear all highlights
  await page.hideHighlight();
});

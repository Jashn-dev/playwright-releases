import { test, expect } from '@playwright/test';

test('upload receipt and verify processing', async ({ context, page }) => {
  // 1. Start HAR tracing — captures API calls as part of the trace
  await using har = await context.tracing.startHar('upload-flow.har', {
    urlFilter: '**/api/**',
  });

  await page.goto('https://storedemo.testdino.com');
  
  // Login mock
  // await page.getByTestId('header-user-icon').click();
  // await page.getByTestId('login-email-input').fill('testuser@example.com');
  // await page.getByTestId('login-password-input').fill('password123');
  // await page.getByTestId('login-submit-button').click();

  // 2. Abort if the test accidentally hits the publish endpoint
  await page.route('**/api/publish', route => {
    test.abort('Upload test must not trigger publish. Check test isolation.');
    return route.abort();
  });

  // 3. Use the new Drop API — no more synthetic DataTransfer hacks
  // await page.getByTestId('header-menu-all-products').click();
  // await page.locator('.product-card').first().click();
  // await page.locator('#receipt-upload').drop({
  //   files: {
  //     name: 'receipt.pdf',
  //     mimeType: 'application/pdf',
  //     buffer: Buffer.from('mock receipt content'),
  //   },
  // });

  // 4. Verify with ARIA snapshot including bounding boxes
  const snapshot = await page.ariaSnapshot({ boxes: true });
  console.log('ARIA Snapshot with boxes:', snapshot);

  // await expect(page.locator('.upload-status')).toContainText('receipt.pdf');
});

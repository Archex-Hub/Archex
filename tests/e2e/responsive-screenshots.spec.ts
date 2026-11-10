import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const viewports = [
  { name: '320px-mobile-compact', width: 320, height: 640 },
  { name: '375px-mobile-standard', width: 375, height: 667 },
  { name: '390px-mobile-modern', width: 390, height: 844 },
  { name: '430px-mobile-large', width: 430, height: 932 },
  { name: '768px-tablet-portrait', width: 768, height: 1024 },
  { name: '1024px-tablet-landscape', width: 1024, height: 768 },
  { name: '1440px-desktop-standard', width: 1440, height: 900 },
  { name: '1920px-desktop-wide', width: 1920, height: 1080 },
];

test.describe('Responsive Viewport Verification & Screenshot Capture', () => {
  const screenshotsDir = path.resolve('artifacts', 'screenshots');

  test.beforeAll(async () => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  for (const vp of viewports) {
    test(`Responsive verification and screenshot at ${vp.width}px (${vp.name})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/', { waitUntil: 'networkidle' });

      // Verify no horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScroll).toBe(false);

      // Verify header and brand wordmark are visible
      const wordmark = page.locator('.site-header .wordmark');
      await expect(wordmark).toBeVisible();

      // Verify Primary CTA is visible and interactable
      const primaryCTA = page.locator('.hero-actions a.cta-craft');
      await expect(primaryCTA).toBeVisible();

      // Take full page screenshot
      const screenshotPath = path.join(screenshotsDir, `archex-${vp.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      expect(fs.existsSync(screenshotPath)).toBe(true);
    });
  }
});


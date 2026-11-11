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

test.describe('Responsive Viewport Audits & Visual Screenshot Captures', () => {
  const screenshotsDir = path.resolve('artifacts', 'screenshots');

  test.beforeAll(async () => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  for (const vp of viewports) {
    test(`Responsive verification and screenshot of Homepage at ${vp.width}px (${vp.name})`, async ({ page }) => {
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

      // Verify Hero primary CTA is visible and clickable
      const primaryCTA = page.locator('.hero-actions a.cta-explore');
      await expect(primaryCTA).toBeVisible();

      // Capture full page screenshot
      const screenshotPath = path.join(screenshotsDir, `archex-home-${vp.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      expect(fs.existsSync(screenshotPath)).toBe(true);
    });
  }

  // Captures for Dedicated Contact Page (Founder Introduction & Gateway)
  test('Capture Contact Page at Desktop (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/contact', { waitUntil: 'networkidle' });

    const heroTitle = page.locator('.founder-hero-title');
    await expect(heroTitle).toBeVisible();
    const destinationBtn = page.locator('a.contact-destination-btn');
    await expect(destinationBtn).toBeVisible();

    const screenshotPath = path.join(screenshotsDir, 'archex-contact-desktop-1440px.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    expect(fs.existsSync(screenshotPath)).toBe(true);
  });

  test('Capture Contact Page at Mobile (390px)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/contact', { waitUntil: 'networkidle' });

    const heroTitle = page.locator('.founder-hero-title');
    await expect(heroTitle).toBeVisible();
    const destinationBtn = page.locator('a.contact-destination-btn');
    await expect(destinationBtn).toBeVisible();

    const screenshotPath = path.join(screenshotsDir, 'archex-contact-mobile-390px.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    expect(fs.existsSync(screenshotPath)).toBe(true);
  });

  // Captures for Dedicated About Page
  test('Capture About Page at Desktop (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/about', { waitUntil: 'networkidle' });

    const title = page.locator('.page-title');
    await expect(title).toBeVisible();

    const screenshotPath = path.join(screenshotsDir, 'archex-about-desktop-1440px.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    expect(fs.existsSync(screenshotPath)).toBe(true);
  });
});

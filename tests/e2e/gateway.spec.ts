import { test, expect } from '@playwright/test';

test.describe('Archex Gateway — Content, Branding & Destination Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Page Title & SEO Metadata are correct', async ({ page }) => {
    await expect(page).toHaveTitle('Archex — Craft and Studio');

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content',
      'Archex Web is now Archex Craft. Discover Archex Craft for digital products and engineering, and Archex Studio for brand and digital experiences.'
    );

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://www.archexweb.in/');
  });

  test('Brand Wordmark is "archex." and does not use prohibited compound names', async ({ page }) => {
    const wordmark = page.locator('.site-header .wordmark');
    await expect(wordmark).toBeVisible();
    await expect(wordmark).toContainText('archex.');

    // Verify page title / heading doesn't use prohibited compound names
    const forbidden = ['Archex Gateway', 'Archex Group', 'Archex Network', 'Archex Digital'];
    const pageText = await page.innerText('body');
    for (const name of forbidden) {
      expect(pageText).not.toContain(name);
    }
  });

  test('Navigation has exact Craft and Studio destinations', async ({ page }) => {
    const craftNav = page.locator('.header-nav a[href="https://craft.archexweb.in/"]');
    const studioNav = page.locator('.header-nav a[href="https://studio.archexweb.in/"]');

    await expect(craftNav).toBeVisible();
    await expect(craftNav).toContainText('Craft');
    await expect(studioNav).toBeVisible();
    await expect(studioNav).toContainText('Studio');
  });

  test('Hero section communicates rebrand and provides all mandatory CTAs', async ({ page }) => {
    const heroHeadline = page.locator('#hero-title');
    await expect(heroHeadline).toBeVisible();
    await expect(heroHeadline).toContainText('Archex Web');
    await expect(heroHeadline).toContainText('is now');
    await expect(heroHeadline).toContainText('Archex Craft');

    const heroDesc = page.locator('.hero-description');
    await expect(heroDesc).toBeVisible();
    await expect(heroDesc).toContainText(
      'The work continues under a new name. Discover Archex Craft — where we build thoughtful digital products, intelligent systems and software experiences.'
    );

    // Primary CTA
    const primaryCTA = page.locator('.hero-actions a.cta-craft');
    await expect(primaryCTA).toBeVisible();
    await expect(primaryCTA).toHaveAttribute('href', 'https://craft.archexweb.in/');
    await expect(primaryCTA).toContainText('Go to Archex Craft');

    // Secondary CTA
    const secondaryCTA = page.locator('.hero-actions a.cta-studio');
    await expect(secondaryCTA).toBeVisible();
    await expect(secondaryCTA).toHaveAttribute('href', 'https://studio.archexweb.in/');
    await expect(secondaryCTA).toContainText('Explore Archex Studio');

    // Supplementary Archive link
    const archiveLink = page.locator('.hero-archive-link');
    await expect(archiveLink).toBeVisible();
    await expect(archiveLink).toHaveAttribute('href', 'https://studio.archexweb.in/work/');
    await expect(archiveLink).toContainText('Curious about the creative work? Explore the Studio archive');
  });

  test('Destinations section presents Destination 01 (Craft) & Destination 02 (Studio)', async ({ page }) => {
    // Destination 01 — Archex Craft
    const craftCard = page.locator('.dest-card--craft');
    await expect(craftCard).toBeVisible();
    await expect(craftCard.locator('.card-index')).toContainText('01 / DIGITAL PRODUCTS & ENGINEERING');
    await expect(craftCard.locator('#craft-title')).toContainText('Archex Craft');
    await expect(craftCard.locator('.card-description')).toContainText(
      "From product ideas to working software. Craft is the new home of Archex Web's digital product and engineering work."
    );
    const craftVisitBtn = craftCard.locator('a.dest-cta--craft');
    await expect(craftVisitBtn).toHaveAttribute('href', 'https://craft.archexweb.in/');
    await expect(craftVisitBtn).toContainText('Visit Craft');

    // Destination 02 — Archex Studio
    const studioCard = page.locator('.dest-card--studio');
    await expect(studioCard).toBeVisible();
    await expect(studioCard.locator('.card-index')).toContainText('02 / BRAND & DIGITAL EXPERIENCE');
    await expect(studioCard.locator('#studio-title')).toContainText('Archex Studio');
    await expect(studioCard.locator('.card-description')).toContainText(
      'An independent creative practice shaping identities, visual systems and digital experiences.'
    );
    const studioVisitBtn = studioCard.locator('a.dest-cta--studio');
    await expect(studioVisitBtn).toHaveAttribute('href', 'https://studio.archexweb.in/');
    await expect(studioVisitBtn).toContainText('Visit Studio');

    const studioWorkLink = studioCard.locator('a.studio-archive-link');
    await expect(studioWorkLink).toHaveAttribute('href', 'https://studio.archexweb.in/work/');
    await expect(studioWorkLink).toContainText('Explore selected work');
  });

  test('Signature visual section is rendered with both branches', async ({ page }) => {
    const sigHeading = page.locator('#sig-title');
    await expect(sigHeading).toBeVisible();
    await expect(sigHeading).toContainText('Two directions, one name.');

    const svgArtwork = page.locator('.signature-svg--desktop');
    await expect(svgArtwork).toBeVisible();

    // Check craft and studio branch groups
    await expect(page.locator('#branch-craft-group')).toBeVisible();
    await expect(page.locator('#branch-studio-group')).toBeVisible();
    await expect(page.locator('#hub-group')).toBeVisible();
  });

  test('Closing section contains required heading and CTAs', async ({ page }) => {
    const closingHeading = page.locator('#closing-title');
    await expect(closingHeading).toBeVisible();
    await expect(closingHeading).toContainText('Find the direction that fits');

    const closingSubhead = page.locator('.closing-subhead');
    await expect(closingSubhead).toContainText('Explore the work that belongs to you.');

    const craftLink = page.locator('.closing-btn--craft');
    await expect(craftLink).toHaveAttribute('href', 'https://craft.archexweb.in/');
    await expect(craftLink).toContainText('Explore Craft');

    const studioLink = page.locator('.closing-btn--studio');
    await expect(studioLink).toHaveAttribute('href', 'https://studio.archexweb.in/');
    await expect(studioLink).toContainText('Visit Studio');
  });

  test('Footer displays brand wordmark, destination links, and dynamic copyright year', async ({ page }) => {
    const footer = page.locator('.site-footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('.footer-wordmark')).toContainText('archex.');
    await expect(footer.locator('.footer-tagline')).toContainText(
      'An evolving practice in digital craft and creative experience.'
    );

    // Links in footer
    await expect(footer.locator('a[href="https://craft.archexweb.in/"]')).toBeVisible();
    await expect(footer.locator('a[href="https://studio.archexweb.in/"]')).toBeVisible();
    await expect(footer.locator('a[href="https://studio.archexweb.in/work/"]')).toBeVisible();

    // Copyright line
    const currentYear = new Date().getFullYear().toString();
    const copyright = footer.locator('.copyright-line');
    await expect(copyright).toContainText(`© ${currentYear} Archex. All directions lead forward.`);
  });

  test('All external links strictly use the approved 3 destination URLs', async ({ page }) => {
    const validDestinations = new Set([
      'https://craft.archexweb.in/',
      'https://studio.archexweb.in/',
      'https://studio.archexweb.in/work/',
    ]);

    const externalAnchors = page.locator('a[href^="http"]');
    const count = await externalAnchors.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await externalAnchors.nth(i).getAttribute('href');
      expect(validDestinations.has(href || '')).toBe(true);
    }
  });

  test('Signature Visual nodes have minimal, stationary hover behavior without coordinate jump', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const craftNode = page.locator('#craft-node');
    const studioNode = page.locator('#studio-node');

    // Scroll into view first so page is stationary during hover checks
    await craftNode.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const craftBoxBefore = await craftNode.boundingBox();
    expect(craftBoxBefore).not.toBeNull();

    // Hover over craft node
    await craftNode.hover();
    await page.waitForTimeout(100);

    const craftBoxAfter = await craftNode.boundingBox();
    expect(craftBoxAfter).not.toBeNull();

    // Coordinates should stay stationary (no wild jump to origin)
    expect(Math.abs((craftBoxAfter?.x ?? 0) - (craftBoxBefore?.x ?? 0))).toBeLessThanOrEqual(1);
    expect(Math.abs((craftBoxAfter?.y ?? 0) - (craftBoxBefore?.y ?? 0))).toBeLessThanOrEqual(1);

    // Verify telemetry status updated
    const telemetry = page.locator('#telemetry-status');
    await expect(telemetry).toContainText('ACTIVE // CRAFT BRANCH');

    // Test studio node
    await studioNode.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);

    const studioBoxBefore = await studioNode.boundingBox();
    expect(studioBoxBefore).not.toBeNull();

    // Hover over studio node
    await studioNode.hover();
    await page.waitForTimeout(100);

    const studioBoxAfter = await studioNode.boundingBox();
    expect(studioBoxAfter).not.toBeNull();

    // Coordinates should stay stationary (no wild jump to origin)
    expect(Math.abs((studioBoxAfter?.x ?? 0) - (studioBoxBefore?.x ?? 0))).toBeLessThanOrEqual(1);
    expect(Math.abs((studioBoxAfter?.y ?? 0) - (studioBoxBefore?.y ?? 0))).toBeLessThanOrEqual(1);

    // Verify telemetry status updated
    await expect(telemetry).toContainText('ACTIVE // STUDIO BRANCH');
  });
});

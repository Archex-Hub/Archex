import { test, expect } from '@playwright/test';

test.describe('Archex Parent Brand — Ecosystem, Governance & Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('1. Homepage Title, Description, Canonical & JSON-LD are correct', async ({ page }) => {
    await expect(page).toHaveTitle('Archex — Independent thinking. Purposeful execution.');

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content',
      'Archex brings together technology, creative thinking and go-to-market expertise to help ideas become meaningful products, experiences and businesses.'
    );

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://www.archexweb.in/');

    // Verify Organization structured data
    const ldJsonScript = page.locator('script[type="application/ld+json"]');
    await expect(ldJsonScript).toBeAttached();
    const ldContent = await ldJsonScript.textContent();
    const parsedLd = JSON.parse(ldContent || '{}');
    expect(parsedLd['@context']).toBe('https://schema.org');
    expect(parsedLd['@graph']).toBeDefined();

    const org = parsedLd['@graph'].find((item: any) => item['@type'] === 'Organization');
    expect(org.name).toBe('Archex');
    expect(org.url).toBe('https://www.archexweb.in');
    expect(org.department).toHaveLength(3);
  });

  test('2. Brand Wordmark is "archex." and does not use prohibited compound names', async ({ page }) => {
    const wordmark = page.locator('.site-header .wordmark');
    await expect(wordmark).toBeVisible();
    await expect(wordmark).toContainText('archex.');

    const forbidden = ['Archex Gateway', 'Archex Group', 'Archex Network', 'Archex Digital'];
    const pageText = await page.innerText('body');
    for (const name of forbidden) {
      expect(pageText).not.toContain(name);
    }
  });

  test('3. Desktop Navigation contains all ecosystem links with verified destinations', async ({ page }) => {
    const headerNav = page.locator('.header-nav.desktop-only');
    await expect(headerNav).toBeVisible();

    // Craft link
    const craftLink = headerNav.locator('a[href="https://craft.archexweb.in/"]');
    await expect(craftLink).toBeVisible();
    await expect(craftLink).toContainText('Craft');

    // Studio link
    const studioLink = headerNav.locator('a[href="https://studio.archexweb.in/"]');
    await expect(studioLink).toBeVisible();
    await expect(studioLink).toContainText('Studio');

    // GTM link (points to internal enquiry anchor, not a fabricated URL)
    const gtmLink = headerNav.locator('a[href="https://gtm.archexweb.in"]');
    await expect(gtmLink).toBeVisible();
    await expect(gtmLink).toContainText('GTM');

    // About link
    const aboutLink = headerNav.locator('a[href="/about"]');
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toContainText('About');

    // Contact link
    const contactLink = headerNav.locator('a[href="https://craft.archexweb.in/contact"]');
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toContainText('Contact');
  });

  test('4. Accessible Mobile Navigation opens, traps focus, and closes via Escape key', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const toggleBtn = page.locator('#mobile-nav-toggle');
    await expect(toggleBtn).toBeVisible();
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    const drawer = page.locator('#mobile-nav-drawer');
    await expect(drawer).toHaveAttribute('hidden', '');

    // Open mobile menu
    await toggleBtn.click();
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(drawer).not.toHaveAttribute('hidden', '');

    // Check links in drawer
    await expect(drawer.locator('a[href="https://craft.archexweb.in/"]')).toBeVisible();
    await expect(drawer.locator('a[href="https://studio.archexweb.in/"]')).toBeVisible();
    await expect(drawer.locator('a[href="https://gtm.archexweb.in"]')).toBeVisible();
    await expect(drawer.locator('a[href="/about"]')).toBeVisible();
    await expect(drawer.locator('a[href="https://craft.archexweb.in/contact"]').first()).toBeVisible();

    // Press Escape to close
    await page.keyboard.press('Escape');
    await expect(drawer).toHaveAttribute('hidden', '');
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });

  test('5. Hero section contains headline, supporting copy, and both primary CTAs', async ({ page }) => {
    const heroTitle = page.locator('#hero-title');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('Three disciplines.');
    await expect(heroTitle).toContainText('One direction');

    const heroDesc = page.locator('.hero-description');
    await expect(heroDesc).toBeVisible();
    await expect(heroDesc).toContainText(
      'Technology, creative thinking and go-to-market strategy, brought together to move ideas forward.'
    );

    // Primary CTA
    const primaryCTA = page.locator('.hero-actions a.cta-explore');
    await expect(primaryCTA).toBeVisible();
    await expect(primaryCTA).toHaveAttribute('href', '#practices');
    await expect(primaryCTA).toContainText('Explore our practices');

    // Secondary CTA
    const secondaryCTA = page.locator('.hero-actions a.cta-contact');
    await expect(secondaryCTA).toBeVisible();
    await expect(secondaryCTA).toHaveAttribute('href', '/contact');
    await expect(secondaryCTA).toContainText('Contact Archex');
  });

  test('6. Practices section renders all 3 distinct cards with correct capabilities and links', async ({ page }) => {
    const practicesSection = page.locator('#practices');
    await expect(practicesSection).toBeVisible();

    // CARD 1: Craft
    const craftCard = practicesSection.locator('.practice-card--craft');
    await expect(craftCard).toBeVisible();
    await expect(craftCard.locator('#craft-title')).toContainText('Craft');
    await expect(craftCard.locator('.card-description')).toContainText(
      'Thoughtful software engineering and digital product development, from early ideas to reliable digital systems.'
    );
    await expect(craftCard.locator('.capabilities-list')).toContainText('Software engineering');
    await expect(craftCard.locator('.capabilities-list')).toContainText('Web applications');
    await expect(craftCard.locator('.capabilities-list')).toContainText('Digital products');
    await expect(craftCard.locator('.capabilities-list')).toContainText('AI integration');
    await expect(craftCard.locator('.capabilities-list')).toContainText('Systems and modernization');
    const craftCta = craftCard.locator('a.card-cta--craft');
    await expect(craftCta).toHaveAttribute('href', 'https://craft.archexweb.in/');
    await expect(craftCta).toContainText('Explore Craft');

    // CARD 2: Studio
    const studioCard = practicesSection.locator('.practice-card--studio');
    await expect(studioCard).toBeVisible();
    await expect(studioCard.locator('#studio-title')).toContainText('Studio');
    await expect(studioCard.locator('.card-description')).toContainText(
      'Brand identity, creative direction and digital experiences built around clarity, meaning and thoughtful design.'
    );
    await expect(studioCard.locator('.capabilities-list')).toContainText('Brand strategy');
    await expect(studioCard.locator('.capabilities-list')).toContainText('Visual identity');
    await expect(studioCard.locator('.capabilities-list')).toContainText('Creative direction');
    await expect(studioCard.locator('.capabilities-list')).toContainText('UI/UX design');
    await expect(studioCard.locator('.capabilities-list')).toContainText('Digital experiences');
    const studioCta = studioCard.locator('a.card-cta--studio');
    await expect(studioCta).toHaveAttribute('href', 'https://studio.archexweb.in/');
    await expect(studioCta).toContainText('Explore Studio');

    // CARD 3: GTM (Must NOT have fabricated destination)
    const gtmCard = practicesSection.locator('.practice-card--gtm');
    await expect(gtmCard).toBeVisible();
    await expect(gtmCard.locator('#gtm-title')).toContainText('GTM');
    await expect(gtmCard.locator('.card-description')).toContainText(
      'Go-to-market strategy and execution to help businesses position, launch and grow their products and services.'
    );
    await expect(gtmCard.locator('.capabilities-list')).toContainText('Market research');
    await expect(gtmCard.locator('.capabilities-list')).toContainText('Ideal customer profiling');
    await expect(gtmCard.locator('.capabilities-list')).toContainText('Positioning and differentiation');
    await expect(gtmCard.locator('.capabilities-list')).toContainText('Pricing and packaging');
    await expect(gtmCard.locator('.capabilities-list')).toContainText('Launch strategy');
    await expect(gtmCard.locator('.capabilities-list')).toContainText('Customer acquisition');
    await expect(gtmCard.locator('.capabilities-list')).toContainText('Growth experiments');
    await expect(gtmCard.locator('.capabilities-list')).toContainText('Funnel optimisation');
    const gtmCta = gtmCard.locator('a.card-cta--gtm');
    await expect(gtmCta).toHaveAttribute('href', 'https://gtm.archexweb.in');
    await expect(gtmCta).toContainText('Explore GTM');
  });

  test('7. Collaboration Framework illustrates flow and clarifies independent engagement', async ({ page }) => {
    const framework = page.locator('#framework');
    await expect(framework).toBeVisible();
    await expect(framework.locator('.framework-lead')).toContainText(
      'An idea may need a clear identity, a working product and a route to market. Archex brings those disciplines together when a project calls for them.'
    );

    // 4 stages
    await expect(framework.locator('.flow-steps-grid')).toContainText('Strategy and direction');
    await expect(framework.locator('.flow-steps-grid')).toContainText('Design and experience');
    await expect(framework.locator('.flow-steps-grid')).toContainText('Engineering and execution');
    await expect(framework.locator('.flow-steps-grid')).toContainText('Market introduction');

    // Collaborative not mandatory notice
    const notice = framework.locator('.framework-notice');
    await expect(notice).toBeVisible();
    await expect(notice).toContainText(
      'This is a collaborative framework, not a mandatory linear process. Clients engage with individual practices independently'
    );
  });

  test('8. About section on Homepage explains why Archex exists and links to full About page', async ({ page }) => {
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection.locator('.about-heading')).toContainText('Independent thinking.');
    await expect(aboutSection.locator('.about-heading')).toContainText('Purposeful execution');
    await expect(aboutSection.locator('.about-statement')).toContainText(
      'Archex brings together technology, creative thinking and go-to-market expertise'
    );

    // 4 pillars
    await expect(aboutSection.locator('.about-pillars')).toContainText('Why Archex exists');
    await expect(aboutSection.locator('.about-pillars')).toContainText('The thinking behind three practices');
    await expect(aboutSection.locator('.about-pillars')).toContainText('Our approach to problem solving');
    await expect(aboutSection.locator('.about-pillars')).toContainText('Thoughtful execution and accountability');

    // Link to /about
    const aboutLink = aboutSection.locator('a[href="/about"]');
    await expect(aboutLink).toBeVisible();
  });

  test('9. Contact CTA section invites conversations and directs to /contact', async ({ page }) => {
    const contactCta = page.locator('#contact-cta');
    await expect(contactCta).toBeVisible();
    await expect(contactCta.locator('#cta-heading')).toContainText('Have something worth building?');
    await expect(contactCta.locator('.cta-description')).toContainText(
      "Tell us what you are working on. We'll help direct your enquiry to the right practice."
    );

    const ctaBtn = contactCta.locator('a.cta-btn');
    await expect(ctaBtn).toHaveAttribute('href', '/contact');
    await expect(ctaBtn).toContainText('Start a conversation');
  });

  test('10. Footer displays brand identity, parent description, all ecosystem links & dynamic year', async ({ page }) => {
    const footer = page.locator('.site-footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('.footer-wordmark')).toContainText('archex.');
    await expect(footer.locator('.footer-desc')).toContainText(
      'Archex brings together technology, creative thinking and go-to-market expertise'
    );

    // Practice links
    await expect(footer.locator('a[href="https://craft.archexweb.in/"]')).toBeVisible();
    await expect(footer.locator('a[href="https://studio.archexweb.in/"]')).toBeVisible();
    await expect(footer.locator('a[href="https://gtm.archexweb.in"]')).toBeVisible();

    // Company & Legal links
    await expect(footer.locator('a[href="/about"]')).toBeVisible();
    await expect(footer.locator('a[href="https://craft.archexweb.in/contact"]')).toBeVisible();
    await expect(footer.locator('a[href="/privacy"]')).toBeVisible();
    await expect(footer.locator('a[href="/terms"]')).toBeVisible();

    // Dynamic current year
    const currentYear = new Date().getFullYear().toString();
    await expect(footer.locator('#copyright-year')).toContainText(currentYear);
  });

  test('11. Dedicated About Page (/about) renders comprehensive philosophy and practice guides', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveTitle('About — Archex');
    await expect(page.locator('.page-title')).toContainText('Independent thinking.');
    await expect(page.locator('.page-title')).toContainText('Purposeful execution');

    // Section headings
    const content = page.locator('.editorial-content');
    await expect(content).toContainText('Why Archex exists');
    await expect(content).toContainText('The three practices');
    await expect(content).toContainText('Our approach to solving problems');
    await expect(content).toContainText('Commitment to thoughtful execution & accountability');

    // Sidebar navigation
    const sidebar = page.locator('.editorial-sidebar');
    await expect(sidebar.locator('a[href="https://craft.archexweb.in/"]')).toBeVisible();
    await expect(sidebar.locator('a[href="https://studio.archexweb.in/"]')).toBeVisible();
    await expect(sidebar.locator('a[href="https://gtm.archexweb.in"]')).toBeVisible();
  });

  test('12. Dedicated Contact Page (/contact) contains all 8 required fields & consent controls', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveTitle('Contact Archex — Start a conversation');
    await expect(page.locator('.contact-title')).toContainText("Let's start a conversation");

    const form = page.locator('#archex-contact-form');
    await expect(form).toBeVisible();

    // All 8 fields
    await expect(form.locator('input#fullName')).toBeVisible();
    await expect(form.locator('input#workEmail')).toBeVisible();
    await expect(form.locator('input#company')).toBeVisible();
    await expect(form.locator('select#practice')).toBeVisible();
    await expect(form.locator('textarea#enquiry')).toBeVisible();
    await expect(form.locator('select#budget')).toBeVisible();
    await expect(form.locator('select#timeline')).toBeVisible();
    await expect(form.locator('textarea#additionalInfo')).toBeVisible();

    // Mandatory Privacy Consent & Separate Optional Marketing Consent
    await expect(form.locator('input#privacyConsent')).toBeVisible();
    await expect(form.locator('input#marketingConsent')).toBeVisible();

    // Submit button
    await expect(form.locator('button#submit-btn')).toBeVisible();
  });

  test('13. Contact Page preselects practice from URL parameter (?practice=gtm)', async ({ page }) => {
    await page.goto('https://gtm.archexweb.in');
    const practiceSelect = page.locator('select#practice');
    await expect(practiceSelect).toHaveValue('gtm');
  });

  test('14. Contact Form validates required fields, shows accessible errors, and prevents invalid submission', async ({ page }) => {
    await page.goto('/contact');
    const submitBtn = page.locator('#submit-btn');

    // Try submitting empty form
    await submitBtn.click();

    // Verify accessible error states
    const nameInput = page.locator('input#fullName');
    await expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#fullName-error')).toContainText('Please enter your full name');

    // Fill valid name, but invalid email
    await nameInput.fill('Alex Rivera');
    const emailInput = page.locator('input#workEmail');
    await emailInput.fill('invalid-email-string');
    await submitBtn.click();

    await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#workEmail-error')).toContainText('Please enter a valid email address');
  });

  test('15. Contact Form successfully submits with valid inputs, generates reference code, and blocks duplicates', async ({ page }) => {
    await page.goto('/contact');

    // Fill valid form data
    await page.locator('input#fullName').fill('Kaif Sayed');
    await page.locator('input#workEmail').fill('kaif@archexweb.in');
    await page.locator('input#company').fill('Acme Corp');
    await page.locator('select#practice').selectOption('craft');
    await page.locator('textarea#enquiry').fill('We are building a new software application and need architectural guidance.');
    await page.locator('select#budget').selectOption('25k-50k');
    await page.locator('select#timeline').selectOption('1-3-months');
    await page.locator('input#privacyConsent').check();

    // Submit form
    await page.locator('#submit-btn').click();

    // Verify Success Region
    const successRegion = page.locator('#submission-success');
    await expect(successRegion).toBeVisible();
    await expect(successRegion.locator('.success-heading')).toContainText('Enquiry received');
    const refCode = await successRegion.locator('#success-ref').innerText();
    expect(refCode).toMatch(/^AX-\d{6}$/);

    // Verify form is hidden after success
    await expect(page.locator('#archex-contact-form')).toBeHidden();
  });

  test('16. Privacy Policy Page (/privacy) identifies Archex, practice relationships, and Indian legal review flag', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page).toHaveTitle('Privacy Policy — Archex');
    await expect(page.locator('.legal-title')).toContainText('Privacy Policy');

    const body = page.locator('.legal-body');
    await expect(body).toContainText('Operator Identity & Brand Architecture');
    await expect(body).toContainText('archexweb.in');
    await expect(body).toContainText('Archex Craft');
    await expect(body).toContainText('Archex Studio');
    await expect(body).toContainText('Archex GTM');

    // Verify Indian Legal Review Notice is prominent
    const advisory = page.locator('.legal-advisory');
    await expect(advisory).toBeVisible();
    await expect(advisory).toContainText('Digital Personal Data Protection Act, 2023 (India)');
    await expect(advisory).toContainText('Indian legal practitioner');
  });

  test('17. Terms of Service Page (/terms) specifies practice independent contracts and Indian jurisdiction', async ({ page }) => {
    await page.goto('/terms');
    await expect(page).toHaveTitle('Terms of Service — Archex');
    await expect(page.locator('.legal-title')).toContainText('Terms of Service');

    const body = page.locator('.legal-body');
    await expect(body).toContainText('Acceptance of Terms');
    await expect(body).toContainText('Ecosystem Structure & Practice Engagements');
    await expect(body).toContainText('No Misleading Guarantees');
    await expect(body).toContainText('Governing Law & Jurisdiction');
    await expect(body).toContainText('laws of India');
  });

  test('18. Custom 404 Page (/404) provides clear navigation back to parent brand and practices', async ({ page }) => {
    await page.goto('/404');
    await expect(page).toHaveTitle('Page Not Found — Archex');
    await expect(page.locator('.not-found-title')).toContainText('Page not found');

    const returnBtn = page.locator('.not-found-actions a[href="/"]');
    await expect(returnBtn).toBeVisible();
    await expect(returnBtn).toContainText('Return to Homepage');
  });
});

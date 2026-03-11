import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/Riverstone Labs/);
  });

  test('should display hero section', async ({ page }) => {
    await expect(page.getByText('AI Implementation That Actually Works')).toBeVisible();
    await expect(page.getByRole('button', { name: /Book Free Assessment/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /See Our Approach/i })).toBeVisible();
  });

  test('should navigate to sections via CTAs', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Book Free Assessment/i });
    await ctaButton.click();
    
    // Check that the CTA section is in view
    await expect(page.locator('#cta')).toBeInViewport();
  });

  test('should display all sections', async ({ page }) => {
    // Problem section
    await expect(page.getByText('Why Most AI Projects Fail')).toBeVisible();
    
    // Approach section
    await expect(page.getByText('Our Proven Process')).toBeVisible();
    
    // Services section
    await expect(page.getByText('What We Deliver')).toBeVisible();
    
    // Proof section
    await expect(page.getByText('Results That Speak')).toBeVisible();
    
    // About section
    await expect(page.getByText('About Riverstone Labs')).toBeVisible();
    
    // Content section
    await expect(page.getByText('Latest Insights')).toBeVisible();
    
    // CTA section
    await expect(page.getByText('Ready to Make AI Work?')).toBeVisible();
  });

  test('should have working navigation in footer', async ({ page }) => {
    await page.getByRole('link', { name: /About/i }).first().click();
    await expect(page.locator('#about')).toBeInViewport();
  });
});

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#cta');
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /Book Free Assessment/i });
    await submitButton.click();
    
    // Check for HTML5 validation
    const nameInput = page.locator('input#name');
    await expect(nameInput).toHaveAttribute('required');
  });

  test('should submit form successfully', async ({ page }) => {
    await page.fill('input#name', 'John Doe');
    await page.fill('input#email', 'john@example.com');
    await page.fill('input#company', 'Test Company');
    await page.fill('textarea#message', 'This is a test message');
    
    const submitButton = page.getByRole('button', { name: /Book Free Assessment/i });
    await submitButton.click();
    
    // Check for success message
    await expect(page.getByText('Message Sent!')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper heading structure', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // Check that h1 contains the main heading
    await expect(h1).toContainText('AI Implementation');
  });

  test('should have alt text for images', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should have accessible buttons with aria labels', async ({ page }) => {
    const scrollButton = page.getByLabel(/Scroll to next section/i);
    await expect(scrollButton).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('should render correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Hero should be visible
    await expect(page.getByText('AI Implementation That Actually Works')).toBeVisible();
    
    // CTAs should be stacked on mobile
    const buttons = page.locator('section').first().getByRole('button');
    await expect(buttons).toHaveCount(2);
  });

  test('should render correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await expect(page.getByText('AI Implementation That Actually Works')).toBeVisible();
  });

  test('should render correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    
    await expect(page.getByText('AI Implementation That Actually Works')).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Page should load in less than 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should not have console errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    expect(errors).toHaveLength(0);
  });
});

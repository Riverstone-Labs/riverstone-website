import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should display navigation with logo and links', async ({ page }) => {
    await page.goto('/');
    
    // Check logo
    await expect(page.getByText('RIVERSTONE')).toBeVisible();
    await expect(page.getByText('LABS')).toBeVisible();
    
    // Check navigation links
    await expect(page.getByRole('button', { name: 'Services' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Case Studies' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Contact' })).toBeVisible();
    
    // Check CTA button
    await expect(page.getByRole('button', { name: 'Book Consultation' })).toBeVisible();
  });

  test('should navigate to services page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Services' }).click();
    await expect(page).toHaveURL(/.*services/);
    await expect(page.getByRole('heading', { name: 'Our Services' })).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'About' }).click();
    await expect(page).toHaveURL(/.*about/);
    await expect(page.getByRole('heading', { name: /Building the Future/ })).toBeVisible();
  });

  test('should navigate to case studies page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Case Studies' }).click();
    await expect(page).toHaveURL(/.*case-studies/);
    await expect(page.getByRole('heading', { name: 'Case Studies' })).toBeVisible();
  });
});

test.describe('Hero Section', () => {
  test('should display hero section with main headline', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: /AI That Actually/ })).toBeVisible();
    await expect(page.getByText('Works')).toBeVisible();
    await expect(page.getByText('Revenue That Actually')).toBeVisible();
    await expect(page.getByText('Grows')).toBeVisible();
  });

  test('should display CTA buttons', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('link', { name: /Schedule Free Consultation/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /See Our Work/ })).toBeVisible();
  });

  test('should scroll to contact section when CTA clicked', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Schedule Free Consultation/ }).click();
    
    // Check if contact section is visible
    await expect(page.getByRole('heading', { name: /Ready to Transform Your Business/ })).toBeVisible();
  });
});

test.describe('Value Proposition Section', () => {
  test('should display value proposition cards', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: "Why We're Different" })).toBeVisible();
    
    // Check value prop cards
    await expect(page.getByRole('heading', { name: 'We Build What We Sell' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'ROI-First Approach' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Stealth Execution' })).toBeVisible();
  });
});

test.describe('Services Section', () => {
  test('should display services section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: 'Our Services' })).toBeVisible();
    
    // Check service cards
    await expect(page.getByRole('heading', { name: 'AI Strategy & Roadmap' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI Implementation Projects' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI Retainer & Optimization' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI Training & Enablement' })).toBeVisible();
  });
});

test.describe('Contact Form', () => {
  test('should display contact form with all fields', async ({ page }) => {
    await page.goto('/#contact');
    
    await expect(page.getByRole('heading', { name: /Ready to Transform Your Business/ })).toBeVisible();
    
    // Check form fields
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Company')).toBeVisible();
    await expect(page.getByLabel('Revenue Range')).toBeVisible();
    await expect(page.getByLabel('Primary Challenge')).toBeVisible();
    await expect(page.getByLabel(/Message/)).toBeVisible();
    
    // Check submit button
    await expect(page.getByRole('button', { name: 'Book Free Consultation' })).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/#contact');
    
    // Submit empty form
    await page.getByRole('button', { name: 'Book Free Consultation' }).click();
    
    // Check validation messages
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Please enter a valid email')).toBeVisible();
    await expect(page.getByText('Company name is required')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/#contact');
    
    // Enter invalid email
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByRole('button', { name: 'Book Free Consultation' }).click();
    
    await expect(page.getByText('Please enter a valid email')).toBeVisible();
  });

  test('should submit form successfully with valid data', async ({ page }) => {
    await page.goto('/#contact');
    
    // Fill in form
    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Company').fill('Test Company');
    await page.getByLabel('Revenue Range').selectOption('500k-2m');
    await page.getByLabel('Primary Challenge').selectOption('dont-know');
    await page.getByLabel(/Message/).fill('Looking forward to discussing AI opportunities');
    
    // Submit form
    await page.getByRole('button', { name: 'Book Free Consultation' }).click();
    
    // Check success message
    await expect(page.getByRole('heading', { name: 'Thank You!' })).toBeVisible();
    await expect(page.getByText(/We've received your inquiry/)).toBeVisible();
  });
});

test.describe('Testimonials Section', () => {
  test('should display testimonials', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: /Trusted by/ })).toBeVisible();
    
    // Check testimonial cards
    await expect(page.getByText('Sarah Chen')).toBeVisible();
    await expect(page.getByText('Michael Torres')).toBeVisible();
    await expect(page.getByText('Emma Wilson')).toBeVisible();
  });
});

test.describe('Footer', () => {
  test('should display footer with links', async ({ page }) => {
    await page.goto('/');
    
    // Check footer logo
    await expect(page.locator('footer').getByText('RIVERSTONE')).toBeVisible();
    
    // Check footer links
    await expect(page.locator('footer').getByText('Services')).toBeVisible();
    await expect(page.locator('footer').getByText('About Us')).toBeVisible();
    await expect(page.locator('footer').getByText('Case Studies')).toBeVisible();
    await expect(page.locator('footer').getByText('Contact')).toBeVisible();
    
    // Check copyright
    await expect(page.locator('footer').getByText(/2026 Riverstone Labs/)).toBeVisible();
  });
});

test.describe('Services Page', () => {
  test('should display all service details', async ({ page }) => {
    await page.goto('/services');
    
    await expect(page.getByRole('heading', { name: 'AI Strategy & Roadmap' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI Implementation Projects' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI Retainer & Optimization' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI Training & Enablement' })).toBeVisible();
  });

  test('should display process steps', async ({ page }) => {
    await page.goto('/services');
    
    await expect(page.getByRole('heading', { name: 'Our Process' })).toBeVisible();
    await expect(page.getByText('Discovery')).toBeVisible();
    await expect(page.getByText('Strategy')).toBeVisible();
    await expect(page.getByText('Implementation')).toBeVisible();
    await expect(page.getByText('Optimization')).toBeVisible();
  });
});

test.describe('About Page', () => {
  test('should display company story', async ({ page }) => {
    await page.goto('/about');
    
    await expect(page.getByRole('heading', { name: /Building the Future/ })).toBeVisible();
    await expect(page.getByText('Our Story')).toBeVisible();
    await expect(page.getByText('Our Values')).toBeVisible();
  });

  test('should display values', async ({ page }) => {
    await page.goto('/about');
    
    await expect(page.getByRole('heading', { name: 'Results First' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pragmatic Innovation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Partnership' })).toBeVisible();
  });
});

test.describe('Case Studies Page', () => {
  test('should display all case studies', async ({ page }) => {
    await page.goto('/case-studies');
    
    await expect(page.getByRole('heading', { name: 'Case Studies' })).toBeVisible();
    
    // Check case study titles
    await expect(page.getByRole('heading', { name: 'AI-Powered Customer Service Automation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Predictive Maintenance System' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dynamic Pricing Optimization' })).toBeVisible();
  });

  test('should display case study results', async ({ page }) => {
    await page.goto('/case-studies');
    
    await expect(page.getByRole('heading', { name: 'Proven Results' })).toBeVisible();
    
    // Check stats
    await expect(page.getByText('90+')).toBeVisible();
    await expect(page.getByText('40-85%')).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('should display mobile menu on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile menu button
    await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeVisible();
    
    // Open mobile menu
    await page.getByRole('button', { name: 'Toggle menu' }).click();
    
    // Check mobile menu items
    await expect(page.getByRole('button', { name: 'Services' })).toHaveCount(2);
    await expect(page.getByRole('button', { name: 'About' })).toHaveCount(2);
  });
});

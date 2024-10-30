import { test, expect } from '@playwright/test';

function generateRandomEmail() {
  const timestamp = Date.now();
  return `user${timestamp}@example.com`;
}

let email;

async function login(page, email, password) {
  await page.goto('/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
}

test.describe('Functionality Test', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies before each test
    await page.context().clearCookies();
    email = generateRandomEmail(); // Generate a unique email
  });

  test('User can register', async ({ page }) => {
    
    await page.goto('/register');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Task Manager')).toBeVisible();
  });

  test('User can log in', async ({ page }) => {
    await login(page, email, 'password');
    await expect(page.locator('text=Task Manager')).toBeVisible();
  });
});
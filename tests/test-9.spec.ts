import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Type guard function
function ensureEnv(variable: string | undefined, name: string): string {
  if (typeof variable !== 'string' || variable === '') {
    throw new Error(`Environment variable ${name} is not set or empty`);
  }
  return variable;
}

// Get environment variables
const URL = ensureEnv(process.env.URL, 'URL');
const USERNAME = ensureEnv(process.env.USERNAME, 'USERNAME');
const PASSWORD = ensureEnv(process.env.PASSWORD, 'PASSWORD');

test('det env test', async ({ page }) => {
  await page.goto(URL);
  await page.locator('#userName').click();
  await page.locator('#userName').fill(USERNAME);
  await page.locator('#password').click();
  await page.locator('#password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: USERNAME }).click();
  await page.getByText('Logout').click();
  await page.close();
});


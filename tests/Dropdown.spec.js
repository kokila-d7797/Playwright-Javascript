import {test,expect} from '@playwright/test';
import logindata from '../testdata/login.json';

test('Autosuggest Dropdown', async ({ page }) => {
    await page.goto('https://www.flipkart.com/');
    await page.getByText('✕', { exact: true }).click();

    const searchbox = page.getByRole('textbox', { name: 'Search for Products, Brands and More' }).first();
    await searchbox.fill('smart');

    // Locator auto-waits and retries until a matching suggestion appears
    const suggestion = page.getByRole('listitem').filter({ hasText: /smartphone/i }).first();
    await suggestion.click();

    // Regex literal, no quotes
    await expect(searchbox).toHaveValue(/smartphone/i);
});

test('Hidden Dropdown', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill(logindata.orangehrm.Username);
    await page.getByRole('textbox', { name: 'Password' }).fill(logindata.orangehrm.Password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'PIM' }).click();

    await page.locator('.oxd-input-group')
        .filter({ hasText: 'Include' })
        .locator('.oxd-select-text')
        .click();

    const options = page.getByRole('option');
    await expect(options).toHaveText([
        'Current Employees Only',
        'Current and Past Employees',
        'Past Employees Only'
    ]);
});
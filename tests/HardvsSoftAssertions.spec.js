const { test, expect } = require('@playwright/test');

test('SauceDemo - Hard Assertions', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    // Hard assertion - URL
    await expect(page).toHaveURL('https://www.saucedemo.com/.text');

    // Hard assertion - Title
    await expect(page).toHaveTitle('Swag Labs');

    // Login
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Hard assertion - Products page
    await expect(page).toHaveURL(/inventory.htmls/);

    // Hard assertion - Products heading
    await expect(page.getByText('Products')).toBeVisible();

    // Hard assertion - Add to cart button
    await expect(
        page.getByRole('button', { name: 'Add to cart' }).first()
    ).toBeVisible();

});

test('SauceDemo - Soft Assertions', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    // Soft assertion - URL
    await expect.soft(page).toHaveURL('https://www.saucedemo.com/');

    // Soft assertion - Title
    await expect.soft(page).toHaveTitle('Swag Labs');

    // Login
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Soft assertion - URL
    await expect.soft(page).toHaveURL(/inventory.html/);

    // Soft assertion - Products heading
    await expect.soft(page.getByText('Products')).toBeVisible();

    // Soft assertion - Add to cart
    await expect.soft(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();

    // This will still execute even if previous soft assertions fail
    console.log('All soft assertions have been checked');

});

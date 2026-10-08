const { test, expect } = require('@playwright/test');
const testData = require('../testdata/registerDataforlocators.json');

test.describe('Handling Locators', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.automationtesting.in/Register.html');
    });

    test('Register form test using CSS', async ({ page }) => {

        // Assert URL
        await expect(page).toHaveURL(
            'https://demo.automationtesting.in/Register.html'
        );

        // Assert Title
        await expect(page).toHaveTitle('Register');

        // Enter First Name
        await page.locator('input[placeholder="First Name"]')
            .fill(testData.registration.firstName);

        // Enter Last Name
        await page.locator('input[placeholder="Last Name"]')
            .fill(testData.registration.lastName);

        // Enter Address
        await page.locator('textarea[ng-model="Adress"]')
            .fill(testData.registration.address);

        // Enter Email
        await page.locator('input[type="email"]')
            .fill(testData.registration.email);

        // Enter Phone
        await page.locator('input[type="tel"]')
            .fill(testData.registration.phone);
    });


    test('Register form test using Built-in Locators', async ({ page }) => {

        // First Name
        await page.getByPlaceholder('First Name')
            .fill(testData.registration.firstName);

        // Last Name
        await page.getByPlaceholder('Last Name')
            .fill(testData.registration.lastName);

        // Address
        await page.getByRole('textbox').nth(2)
            .fill(testData.registration.address);

        // Email
        await page.getByRole('textbox').nth(3)
            .fill(testData.registration.email);

        // Phone
        await page.getByRole('textbox').nth(4)
            .fill(testData.registration.phone);
    });

});
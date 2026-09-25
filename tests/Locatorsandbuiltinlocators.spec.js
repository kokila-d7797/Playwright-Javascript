const { test, expect } = require('@playwright/test');

test('Register form test using CSS ', async ({ page }) => {

    // Open website
    await page.goto('https://demo.automationtesting.in/Register.html');

    // Assert URL
    await expect(page).toHaveURL('https://demo.automationtesting.in/Register.html');

    // Assert Title
    await expect(page).toHaveTitle('Register');

    // Enter First Name
    await page.locator('input[placeholder="First Name"]').fill('John');

    // Enter Last Name
    await page.locator('input[placeholder="Last Name"]').fill('Doe');

    // Enter Address
    await page.locator('textarea[ng-model="Adress"]').fill('123 Main Street, Chennai');

    // Enter Email
    await page.locator('input[type="email"]').fill('john.doe@example.com');

    // Enter Phone
    await page.locator('input[type="tel"]').fill('9876543210');

    await page.waitForTimeout(2000);

});

test ("Register form test using Built-in Locators", async({page})=> {
   
    // Open website
    await page.goto('https://demo.automationtesting.in/Register.html')

    // First Name
    await page.getByPlaceholder('First Name').fill('John')

    // Last Name
    await page.getByPlaceholder('Last Name').fill('Doe')

    // Address
    await page.getByRole('textbox').nth(2).fill('123 Main Street, Chennai')

    // Email
    await page.getByRole('textbox').nth(3).fill('john.doe@example.com')

    // Phone
    await page.getByRole('textbox').nth(4).fill('9876543210')

    await page.waitForTimeout(2000)
})

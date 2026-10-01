import {test,expect} from '@playwright/test';

test("Inputting Textbox", async ({page}) => {

    await page.goto ("https://demo.automationtesting.in/Register.html");
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.locator('textarea:visible').fill('America');
    await page.locator('input[type="email"]').fill('johndoe@gmail.com');
    await page.locator('input[type="tel"]').fill('9876543210');
    await page.waitForTimeout(2000);
});

test("Inputting Radio button", async ({page}) =>{

    await page.goto ("https://demo.automationtesting.in/Register.html");
    await page.getByLabel('Male', { exact: true }).check();
    await expect(await page.locator("input[value='Male']")).toBeChecked();
    await expect (await page.getByLabel('FeMale').isChecked()).toBeFalsy();
    await page.waitForTimeout(2000);

});

test ("Inputting Checkbox", async ({page}) => {

    await page.goto("https://demo.automationtesting.in/Register.html");
    await page.getByRole('checkbox').nth(0).check();
    await page.getByRole('checkbox').nth(2).check();
    await page.waitForTimeout(2000);

    //selecting all checkboxes
    const checkboxes = await page.getByRole('checkbox');
    const count = await checkboxes.count();
    for(let i=0; i<count; i++)
    {
        await checkboxes.nth(i).check();
    }
})
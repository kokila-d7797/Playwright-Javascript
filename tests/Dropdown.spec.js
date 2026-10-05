import {test,expect} from '@playwright/test';

test("Autosuggest Dropdown", async ({page}) => {

    await page.goto("https://www.flipkart.com/");
    await page.getByText('✕', { exact: true }).click();
    const searchbox = await page.getByRole('textbox', { name: 'Search for Products, Brands and More' }).nth(0);
    await searchbox.fill('smart');
    //await page.waitForSelector('//ul[@class="VCplLH lTpUwR bRjjIF _1psv1ze5l _1psv1ze9l _1psv1ze7c _1cisqlf2"] /li/div');
    const productoptions = await page.$$('//ul[@class="VCplLH lTpUwR bRjjIF _1psv1ze5l _1psv1ze9l _1psv1ze7c _1cisqlf2"] /li/div');
    for(let option of productoptions)
    {
        const value= await option.textContent();
        //console.log(value);
        if(value.includes('smartphone'))
        {
            await option.click();
            break;
        }
    }

    // Assertion
    await expect(searchbox).toHaveValue('/smartphone/i');
});

test("Hidden Dropdown", async({page}) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByText('PIM').click();
    const includeField = page.locator('.oxd-input-group').filter({ hasText: 'Include' }).locator('.oxd-select-text');
    await includeField.click();
    const options = page.locator('.oxd-select-dropdown:visible .oxd-select-option:visible');
    await options.first().waitFor();
    console.log(await options.allInnerTexts());
    // Assertions
    await expect(options).toContainText([
        'Current Employees Only',
        'Current Employees and Their Past Employees',
        'Past Employees Only'
    ]);


})
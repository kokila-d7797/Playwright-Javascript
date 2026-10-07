import {test,expect} from '@playwright/test';

test.use({
    trace:'on' 
})

test('Trace Viewer', async ({page}) => {

    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    const errormessage = 'Epic sadface: Sorry, this user has been locked out.';
    await expect(page.getByRole('alert')).toHaveText(errormessage);
});
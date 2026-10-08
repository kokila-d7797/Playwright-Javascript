import {test,expect} from '@playwright/test';
import logindata from '../testdata/login.json';

//recording video for particular test
test.use({
    video:'on' //off, retain-on-failure,on-first-retry
});

test('Handling Screenshots and videos', async ({page}) => {

    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill(logindata.swaglab.Username);
    await page.getByPlaceholder('Password').fill(logindata.swaglab.Password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    //taking full page screenshot
    await page.screenshot({path:'screenshots/'+'fullpage.png',fullPage:true});

    //taking screenshot for particular element
    await page.locator('.inventory_item').nth(1).screenshot({path:'screenshots/element.png'});
});
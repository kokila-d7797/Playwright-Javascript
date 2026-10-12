import {test,expect} from '@playwright/test';
import logindata from '../testdata/login.json';
import traceURL from '../testdata/urlData.json';

test.use({
    trace:'on' 
})

test('Trace Viewer', async ({page}) => {

    await page.goto(traceURL.traceviewerurl);
    await page.getByPlaceholder('Username').fill(logindata.swaglablockeduser.Username);
    await page.getByPlaceholder('Password').fill(logindata.swaglablockeduser.Password);
    await page.getByRole('button', { name: 'Login' }).click();
    const errormessage = 'Epic sadface: Sorry, this user has been locked out.';
    await expect(page.getByRole('alert')).toHaveText(errormessage);
});
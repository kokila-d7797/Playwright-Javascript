import {test,expect} from '@playwright/test';
import alertsData from '../testdata/alertsData.json';

test.describe ('Handling Alerts', () => {

test.beforeEach(async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
});

test ('Alert with OK', async ({page})=> {

    //enabling dialog window handler
    page.on ('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toBe(alertsData.alert.message);
        await dialog.accept();
    });

    const alert = page.getByRole('button',{name:'Click for JS Alert'});
    await alert.click();
});

test ('Confirm Dialog', async({page}) => {

    //enabling dialog window handler
    page.on ('dialog', async dialog =>{
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe(alertsData.confirm.message);
        await dialog.accept();
    });

    const alert = page.getByRole('button',{name:'Click for JS Confirm'});
    await alert.click();
});

test ('Prompt Dialog',async ({page}) => {

    //enabling dialog window handler
    page.on ('dialog', async dialog =>{
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe(alertsData.prompt.message);
        await dialog.accept(alertData.prompt.userInput);
        //await dialog.dismiss();
    });

    const alert = page.getByRole('button',{name:'Click for JS Prompt'});
    await alert.click();
    await expect (page.locator('#result')).toHaveText(`You entered: ${userinput}`);
});
});
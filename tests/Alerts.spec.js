import {test,expect} from '@playwright/test'

test ('Alert with OK', async ({page})=> {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    //enabling dialog window handler
    page.on ('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toBe('I am a JS Alert');
        await dialog.accept();
    });

    const alert = page.getByRole('button',{name:'Click for JS Alert'});
    await alert.click();
});

test ('Confirm Dialog', async({page}) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    //enabling dialog window handler
    page.on ('dialog', async dialog =>{
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('I am a JS Confirm');
        await dialog.accept();
    });

    const alert = page.getByRole('button',{name:'Click for JS Confirm'});
    await alert.click();
});

test ('Prompt Dialog',async ({page}) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    const userinput = 'Hello User';

    //enabling dialog window handler
    page.on ('dialog', async dialog =>{
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe('I am a JS prompt');
        await dialog.accept(userinput);
        //await dialog.dismiss();
    });

    const alert = page.getByRole('button',{name:'Click for JS Prompt'});
    await alert.click();
    await expect (page.locator('#result')).toHaveText(`You entered: ${userinput}`);
});
import {test,expect} from '@playwright/test';
import alertsData from '../testdata/alertsData.json';

test.describe ('Handling Alerts', () => {

test.beforeEach(async ({page}) => {
    await page.goto('https://www.playwrightautomation.com/practice.html#section-alerts');
});

test ('Alert with OK', async ({page})=> {

    //enabling dialog window handler
    page.on ('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toBe(alertsData.alert.message);
        await dialog.accept();
    });

    const alert = page.getByRole('button', { name: 'Simple Alert' });
    await alert.click();
    await expect(page.getByText('Alert accepted.', { exact: true })).toBeVisible();
});

test ('Confirm Dialog', async({page}) => {

    //enabling dialog window handler
    page.on ('dialog', async dialog =>{
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe(alertsData.confirm.message);
        await dialog.accept();
    });

    const alert = page.getByRole('button', { name: 'Confirmation Alert' });
    await alert.click();
    await expect(page.getByText('You pressed OK!', { exact: true })).toBeVisible();
});

test('Prompt Dialog', async ({ page }) => {
    page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe(alertsData.prompt.message);
        await dialog.accept(alertsData.prompt.userInput);
    });

    await page.getByRole('button', { name: 'Prompt Alert' }).click();

    await expect(page.getByTestId('prompt-result'))
        .toHaveText(`Hello ${alertsData.prompt.userInput}! How are you today?`);
});
});
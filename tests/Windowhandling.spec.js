const { test, expect } = require('@playwright/test');
import windowUrl from '../testdata/urlData.json';

test.beforeEach ('Handling Windows', async({page}) => {
    await page.goto(windowUrl.windowurl);
});

test('Handle New Tab', async ({ page, context }) => {   
    // Start waiting before clicking the button
    const newTabPromise = context.waitForEvent('page');
    await page.getByRole('button', { name: 'Open Playwright Docs' }).click();
    const newTab = await newTabPromise;
    await newTab.waitForLoadState();
    console.log('New tab URL:', newTab.url());
    console.log('New tab title:',await newTab.title());
    await expect(newTab).toHaveURL(/.+/);
    await newTab.close();
});

test('Handle New Window', async ({ page }) => {
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Open Mobilewright Window' }).click();
    const newWindow = await popupPromise;
    await newWindow.waitForLoadState();
    console.log('New window URL:', newWindow.url());
    console.log('New window title:',await newWindow.title());
    await expect(newWindow).toHaveURL(/.+/);
});

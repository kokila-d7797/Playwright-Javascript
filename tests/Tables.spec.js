import {test,expect} from '@playwright/test';
import tablesData from '../testdata/tablesData.json';

test.describe('Handling Tables', ()=> {
let page;
    test.beforeEach(async ({browser}) => {
        page=await browser.newPage();
        await page.goto('https://practice.expandtesting.com/dynamic-pagination-table');
    });

    test ('Pagination Table', async({page}) => {

        const table =  page.locator('#example');
        const rows =  table.locator('tbody tr');
        console.log('Number of rows:', await rows.count());
        const columns = table.locator('thead th');
        console.log('Number of columns:',await columns.count());
        //searching for particular user row
        await page.getByRole('searchbox').fill(tablesData.tables.searchname);
        await expect (await rows.toContainText(tablesData.tables.searchname));
        await page.waitForTimeout(2000);
    })
})
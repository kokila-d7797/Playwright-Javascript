import {test,expect} from '@playwright/test';
import tablesData from '../testdata/tablesData.json';
import tableURL from '../testdata/urlData.json';

test.describe('Handling Tables', ()=> {
    test.beforeEach(async ({page}) => {
        await page.goto(tableURL.tableurl);
    });

    test ('Pagination Table', async({page}) => {

        const table =  page.locator('#example');
        const rows =  table.locator('tbody tr');
        console.log('Number of rows:', await rows.count());
        const columns = table.locator('thead th');
        console.log('Number of columns:',await columns.count());
        //searching for particular user row
        await page.getByLabel('Search:').fill(tablesData.searchname);
        await expect (rows).toContainText(tablesData.searchname);
    })
})
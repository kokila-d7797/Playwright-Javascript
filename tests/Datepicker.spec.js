import {test,expect} from '@playwright/test';

test('Datepicker using HTML', async ({page}) => {

    await page.goto ('https://www.playwrightautomation.com/practice.html#section-datepicker-native');

    //filling DOB
    const DOB = await page.getByLabel('Date of Birth', { exact: true });
    await DOB.fill('2000-10-25');
    await page.waitForTimeout(2000);

    //filling passport issued date
    const passportissuedate = await page.getByLabel('Passport Issued Date');
    await passportissuedate.fill('2018-05-20');
    await page.waitForTimeout(2000);

    //filling passport expiry date
    const passportexpirydate = await page.getByLabel('Passport Expiry Date');
    await passportexpirydate.fill('2028-05-10');
    await page.waitForTimeout(2000);

});

test('UI Datepicker', async ({page}) => {

    await page.goto('https://www.playwrightautomation.com/practice.html#section-datepicker-native');

    const date = '20';
    const monthyear = 'August 2020';
    const monthYear = '2020-08';
    await page.getByPlaceholder('Click to pick a date…').click();
    while (true)
    {
        const currentyearmonth = await page.getByTestId('dp-arrow-month-label').textContent();
        if (currentyearmonth==monthyear)
        {
            break;
        }
        const previous = page.getByTestId('dp-arrow-prev');
        await previous.click();
    }
    //selecting date
    //await page.locator(`td.dp-cell[data-date$="-${date}"]`).click();  //when passing only date its locating 7 element so going to month year date
    await page.locator(`td.dp-cell[data-date="${monthYear}-${date}"]`).click();
    await page.waitForTimeout(2000);

});

test ('Dropdown Datepicker', async ({page})=> {

    await page.goto('https://www.playwrightautomation.com/practice.html#section-datepicker-native');

    const monthYear='2017-06';
    const date='18'
    //selecting month
    const month = page.locator('#dp-dd-month:visible');
    await month.selectOption('June');

    //selecting year
    const year = page.locator('#dp-dd-year');
    await year.selectOption('2017');

    //selecting date
    const dateselection = await page.locator(`td.dp-cell[data-date="${monthYear}-${date}"]`);
    await dateselection.click();
    await page.waitForTimeout(5000);
});

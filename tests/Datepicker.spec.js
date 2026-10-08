import { test } from '@playwright/test';
import dateData from '../testdata/datepickerData.json';

test.describe('Handling Datepicker', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(
            'https://www.playwrightautomation.com/practice.html#section-datepicker-native'
        );
    });

    test('Datepicker using HTML', async ({ page }) => {

        // Date of Birth
        const DOB = page.getByLabel('Date of Birth', { exact: true });
        await DOB.fill(dateData.htmlDatepicker.dateOfBirth);

        // Passport Issued Date
        const passportissuedate = page.getByLabel('Passport Issued Date');
        await passportissuedate.fill(
            dateData.htmlDatepicker.passportIssuedDate
        );

        // Passport Expiry Date
        const passportexpirydate = page.getByLabel('Passport Expiry Date');
        await passportexpirydate.fill(
            dateData.htmlDatepicker.passportExpiryDate
        );
    });


    test('UI Datepicker', async ({ page }) => {

        const date = dateData.uiDatepicker.date;
        const monthyear = dateData.uiDatepicker.monthYear;
        const monthYear = dateData.uiDatepicker.monthYearValue;

        await page.getByPlaceholder('Click to pick a date…').click();

        while (true) {

            const currentyearmonth =
                await page.getByTestId('dp-arrow-month-label').textContent();

            if (currentyearmonth === monthyear) {
                break;
            }

            const previous = page.getByTestId('dp-arrow-prev');
            await previous.click();
        }

        // Select date
        await page
            .locator(`td.dp-cell[data-date="${monthYear}-${date}"]`)
            .click();
    });


    test('Dropdown Datepicker', async ({ page }) => {

        const month = dateData.dropdownDatepicker.month;
        const year = dateData.dropdownDatepicker.year;
        const date = dateData.dropdownDatepicker.date;
        const monthYear = dateData.dropdownDatepicker.monthYearValue;

        // Select month
        const monthLocator = page.locator('#dp-dd-month:visible');
        await monthLocator.selectOption(month);

        // Select year
        const yearLocator = page.locator('#dp-dd-year');
        await yearLocator.selectOption(year);

        // Select date
        const dateSelection =
            page.locator(`td.dp-cell[data-date="${monthYear}-${date}"]`);

        await dateSelection.click();
    });

});
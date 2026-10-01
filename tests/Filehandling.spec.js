const {test,expect} = require ('@playwright/test');

test ('File Upload', async ({page}) => {

    await page.goto('https://www.playwrightautomation.com/practice#section-upload-standard');

    //uploading single file
    await page.locator('#upload-single').setInputFiles('files/File1.pdf');
    await page.waitForTimeout(2000);

    //validating single file
    await expect (page.getByTestId('upload-single-result')).toHaveText('File1.pdf');

    //uploading multiple file
    await page.locator('#upload-multiple').setInputFiles(['files/File1.pdf', 'files/file2.txt']);
    await page.waitForTimeout(2000);

    //validating multiple files
    await expect(page.getByTestId('upload-multiple-count')).toHaveText('2');

    //removing file upload
    await page.locator('#upload-multiple').setInputFiles([]);

    //validating removing files 
    await expect(page.getByTestId('upload-multiple-count')).toHaveText('0');


});
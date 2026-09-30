const {test,expect} = require ('@playwright/test')

test ('Single Frame Access ', async ({page})=> {

    await page.goto('https://app.thetestingacademy.com/playwright/frames/');

    const vehiclename = await page.frameLocator('#frame-one').getByLabel('Vehicle name');
    await vehiclename.fill('Mahindra');
    const ownername = await page.frameLocator('#frame-one').getByLabel('Owner name');
    await ownername.fill('Anushka');
    const registrationnum = await page.frameLocator('#frame-one').getByLabel('Registration number');
    await registrationnum.fill('MH 20 NH 1234');
    const year = await page.frameLocator('#frame-one').getByLabel('Year');
    await year.fill('2025');
    const vehicletypeoptions = await page.frameLocator('#frame-one').getByRole('combobox');
    await vehicletypeoptions.selectOption('Sedan');
    const notes = await page.frameLocator('#frame-one').getByLabel('Notes');
    await notes.fill('Registration');

    await page.waitForTimeout(2000);

    await page.frameLocator('#frame-one').getByRole('button', {name:'Submit registration'});

});

test.only('Multiple frame access', async ({page}) => {

    await page.goto('https://app.thetestingacademy.com/playwright/frames/multi-frames');

    const allframes = page.frames();
    console.log('Count of frames:', allframes.length); //count cant be used because page.frames uses javascript array object

    
});
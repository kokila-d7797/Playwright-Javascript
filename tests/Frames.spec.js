const {test} = require ('@playwright/test')
const framesData = require('../testdata/framesData.json');

test.describe ('Handling Frames', ()=> {

test.beforeEach(async ({page}) => {
    await page.goto('https://app.thetestingacademy.com/playwright/frames/');
});


test ('Single Frame Access ', async ({page})=> {

    const framename = page.frameLocator('#frame-one');
    const vehiclename = await framename.getByLabel('Vehicle name');
    await vehiclename.fill(framesData.vehicleRegistration.vehicleName);
    const ownername = await framename.getByLabel('Owner name');
    await ownername.fill(framesData.vehicleRegistration.vehicleName);
    const registrationnum = await framename.getByLabel('Registration number');
    await registrationnum.fill(framesData.vehicleRegistration.registrationNumber);
    const year = await framename.getByLabel('Year');
    await year.fill(framesData.vehicleRegistration.year);
    const vehicletypeoptions = await framename.getByRole('combobox');
    await vehicletypeoptions.selectOption(framesData.vehicleRegistration.vehicleType);
    const notes = await framename.getByLabel('Notes');
    await notes.fill(framesData.vehicleRegistration.notes);
    await page.frameLocator('#frame-one').getByRole('button', {name:'Submit registration'});

});

test('Multiple frame access', async ({page}) => {

    const allframes = page.frames();
    console.log('Count of frames:', allframes.length); //count cant be used because page.frames uses javascript array object

});  
});
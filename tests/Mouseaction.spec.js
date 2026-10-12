import {test,expect} from '@playwright/test';
import mouseData from '../testdata/urlData.json';

test ('Handling Mouse Actions', async ({page}) => {
    await page.goto (mouseData.mouseurl);

    //mouse hover action
    const hoverbutton = page.getByRole('button', {name:'Point Me'});
    await hoverbutton.hover();
    const options = page.locator('#hover-dropdown a');
    const actualOptions = await options.allTextContents();
    console.log(actualOptions);
    await expect(actualOptions).toEqual([
    'Mobiles',
    'Laptops',
    'Tablets'
    ]);

    //mouse right click
    const rightclickbutton = page.getByRole('button', {name:'Right Click Me'});
    await rightclickbutton.click({button:'right'});
    const rightclickoptions =await page.getByTestId('context-menu').allInnerTexts();
    console.log(rightclickoptions);
    await page.getByRole('menuitem', {name:'Copy'}).click();
    await expect(page.getByTestId('context-menu-result')).toContainText('Copy');

    //mouse double click 
    const doubleclickcopy = page.getByRole('button', {name:'Copy Text'});
    await doubleclickcopy.dblclick();
    await expect(page.getByRole('textbox', { name: 'Field 2 (target)' })).toHaveValue('Hello Automation!');

    //mouse drag and drop
    const washington= page.getByText('Washington', { exact: true });
    const USA = page.getByTestId('drop-usa');
    await washington.dragTo(USA);
    await expect(page.getByText('1 / 3', { exact: true })).toBeVisible();

    //mouse sliding action
    const slider = page.locator('#price-slider');

    // Move slider to the right
    await slider.focus();
    await slider.press('ArrowRight');
    await slider.press('ArrowRight');
    await slider.press('ArrowRight');

    // Verify value
    console.log('Slider value:', await slider.inputValue());

});
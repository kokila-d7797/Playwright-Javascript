import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/Productpage';
import { CartPage } from '../pages/Cartpage';
import cartData from '../testdata/cartData.json';

test.describe('Demoblaze Cart', () => {
  let homePage, productPage, cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await homePage.goto();
  });

  test('Add to cart', async () => {
    const { name, category, price } = cartData.product;
    await homePage.openProduct(name, category);
    await productPage.expectTitle(name);
    expect(await productPage.addToCart()).toContain(cartData.messages.productAdded);
    await homePage.openCart();
    await cartPage.expectProductInCart(name, price);
  });
});
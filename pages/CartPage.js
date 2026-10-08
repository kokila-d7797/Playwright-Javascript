import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.rows = page.locator('#tbodyid tr');
    this.totalPrice = page.locator('#totalp');
  }

  rowFor(productName) {
    return this.rows.filter({ hasText: productName });
  }

  async expectProductInCart(productName, price) {
    const row = this.rowFor(productName);
    await expect(row).toHaveCount(1);
    if (price) {
      await expect(row.locator('td').nth(2)).toHaveText(price);
    }
  }

  async removeProduct(productName) {
    await this.rowFor(productName).getByRole('link', { name: 'Delete' }).click();
  }

  async expectProductNotInCart(productName) {
    await expect(this.rowFor(productName)).toHaveCount(0);
  }

  async expectCartEmpty() {
    await expect(this.rows).toHaveCount(0);
  }
}
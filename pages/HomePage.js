import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('#cartur');
    this.productTitles = page.locator('#tbodyid .card-title a');
  }

  async goto() {
    await this.page.goto('https://demoblaze.com/');
    await expect(this.productTitles.first()).toBeVisible();
  }

  async selectCategory(category) {
    await this.page.getByRole('link', { name: category, exact: true }).click();
  }

  // Category is passed from test data, since products are listed per category
  async openProduct(name, category) {
    await this.selectCategory(category);
    await this.page.getByRole('link', { name, exact: true }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
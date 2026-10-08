import { expect } from '@playwright/test';

export class ProductPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('h2.name');
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
  }

  async expectTitle(name) {
    await expect(this.title).toHaveText(name);
  }

  // Add to cart triggers a native alert; returns its message
  async addToCart() {
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.addToCartButton.click(),
    ]);
    const message = dialog.message();
    await dialog.accept();
    return message;
  }
}
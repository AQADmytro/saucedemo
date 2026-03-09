import { Page } from '@playwright/test';

export class CartItemsComponent {
  private readonly items;

  constructor(page: Page) {
    this.items = page.locator('.cart_item');
  }

  async getCartItemCount(): Promise<number> {
    return this.items.count();
  }

  async getItemNames(): Promise<string[]> {
    return this.items.locator('.inventory_item_name').allInnerTexts();
  }

  async getItemPrice(productName: string): Promise<string> {
    return this.items.filter({ hasText: productName }).locator('.inventory_item_price').innerText();
  }

  async getItemDescription(productName: string): Promise<string> {
    return this.items.filter({ hasText: productName }).locator('.inventory_item_desc').innerText();
  }

  async removeItem(productName: string): Promise<void> {
    await this.items.filter({ hasText: productName }).locator('[data-test^="remove"]').click();
  }
}

import { Locator, Page } from '@playwright/test';
import { MenuComponent, CartBadgeComponent } from '@components/index';

export class ProductsPage {
  public readonly menu: MenuComponent;
  public readonly cartBadge: CartBadgeComponent;
  private readonly sortDropdown: Locator;
  private readonly inventoryItems: Locator;
  private readonly itemPrices: Locator;

  constructor(page: Page) {
    this.menu = new MenuComponent(page);
    this.cartBadge = new CartBadgeComponent(page);
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.itemPrices = page.locator('.inventory_item_price');
  }

  async sortBy(option: 'name: a-z' | 'name: z-a' | 'price: low-high' | 'price: high-low'): Promise<void> {
    const optionMap = {
      'name: a-z': 'az',
      'name: z-a': 'za',
      'price: low-high': 'lohi',
      'price: high-low': 'hilo',
    };
    await this.sortDropdown.selectOption(optionMap[option]);
  }

  async getProductImage(productName: string): Promise<string> {
    return (await this.inventoryItems.filter({ hasText: productName }).locator('img').getAttribute('src')) ?? '';
  }

  async getProductPrice(productName: string): Promise<string> {
    return this.inventoryItems.filter({ hasText: productName }).locator('.inventory_item_price').innerText();
  }

  async getProductDescription(productName: string): Promise<string> {
    return this.inventoryItems.filter({ hasText: productName }).locator('.inventory_item_desc').innerText();
  }

  async getItemPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allInnerTexts();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async getItemNames(): Promise<string[]> {
    return this.inventoryItems.locator('.inventory_item_name').allInnerTexts();
  }

  async isSorted(by: 'name' | 'price', order: 'asc' | 'desc'): Promise<boolean> {
    const items = by === 'name' ? await this.getItemNames() : await this.getItemPrices();
    return items.every((item, i, arr) => i === 0 || (order === 'asc' ? arr[i - 1] <= item : arr[i - 1] >= item));
  }

  async addToCart(productName: string): Promise<void> {
    await this.inventoryItems.filter({ hasText: productName }).locator('[data-test^="add-to-cart"]').click();
  }

  async removeFromCart(productName: string): Promise<void> {
    await this.inventoryItems.filter({ hasText: productName }).locator('[data-test^="remove"]').click();
  }

  async openProductDetail(productName: string, by: 'name' | 'image' = 'name'): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await (by === 'image' ? item.locator('img') : item.locator('.inventory_item_name')).click();
  }
}

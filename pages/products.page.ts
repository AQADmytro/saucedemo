import { expect, Locator, Page } from '@playwright/test';
import { MenuComponent, CartBadgeComponent } from '@components/index';
import { BasePage } from './base.page';
import { Product } from '@types-app/product.type';

export class ProductsPage extends BasePage {
  public readonly menu: MenuComponent;
  public readonly cartBadge: CartBadgeComponent;
  public readonly sortDropdown: Locator;
  public readonly inventoryItems: Locator;
  public readonly itemPrices: Locator;

  constructor(page: Page) {
    super(page);
    this.menu = new MenuComponent(page);
    this.cartBadge = new CartBadgeComponent(page);
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.itemPrices = page.locator('.inventory_item_price');
  }

  productPrice(productName: string): Locator {
    return this.inventoryItems.filter({ hasText: productName }).locator('.inventory_item_price');
  }

  productDescription(productName: string): Locator {
    return this.inventoryItems.filter({ hasText: productName }).locator('.inventory_item_desc');
  }

  productImage(productName: string): Locator {
    return this.inventoryItems.filter({ hasText: productName }).locator('img');
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

  async getItemPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allInnerTexts();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async getItemNames(): Promise<string[]> {
    return this.inventoryItems.locator('.inventory_item_name').allInnerTexts();
  }

  async verifySorting(by: 'name' | 'price', order: 'asc' | 'desc'): Promise<void> {
    const items = by === 'name' ? await this.getItemNames() : await this.getItemPrices();
    const isSorted = items.every(
      (item, i, arr) => i === 0 || (order === 'asc' ? arr[i - 1] <= item : arr[i - 1] >= item),
    );
    expect(isSorted).toBe(true);
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

  async verifyProductCard(product: Product): Promise<void> {
    await Promise.all([
      expect(this.productPrice(product.name)).toHaveText(product.price),
      expect(this.productDescription(product.name)).toHaveText(product.description),
      expect(this.productImage(product.name)).toHaveAttribute('src', new RegExp(product.image)),
    ]);
  }
}

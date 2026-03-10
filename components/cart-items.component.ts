import { expect, Locator, Page } from '@playwright/test';
import { Product } from '@types-app/product.type';

export class CartItemsComponent {
  public readonly item: Locator;
  public readonly itemName: Locator;

  constructor(page: Page) {
    this.item = page.locator('.cart_item');
    this.itemName = this.item.locator('.inventory_item_name');
  }

  itemPrice(productName: string): Locator {
    return this.item.filter({ hasText: productName }).locator('.inventory_item_price');
  }

  itemDescription(productName: string): Locator {
    return this.item.filter({ hasText: productName }).locator('.inventory_item_desc');
  }

  async verifyProducts(products: Product[]): Promise<void> {
    await Promise.all(
      products.flatMap((product) => [
        expect(this.itemPrice(product.name)).toHaveText(product.price),
        expect(this.itemDescription(product.name)).toHaveText(product.description),
      ]),
    );
  }

  async removeItem(productName: string): Promise<void> {
    await this.item.filter({ hasText: productName }).locator('[data-test^="remove"]').click();
  }
}

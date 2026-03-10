import { expect, Locator, Page } from '@playwright/test';
import { CartBadgeComponent } from '@components/index';
import { BasePage } from './base.page';
import { Product } from '@types-app/product.type';

export class ProductDetailPage extends BasePage {
  public readonly cartBadge: CartBadgeComponent;
  public readonly name: Locator;
  public readonly description: Locator;
  public readonly price: Locator;
  public readonly image: Locator;
  public readonly addToCartButton: Locator;
  public readonly removeButton: Locator;
  public readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartBadge = new CartBadgeComponent(page);
    this.name = page.locator('[data-test="inventory-item-name"]');
    this.description = page.locator('[data-test="inventory-item-desc"]');
    this.price = page.locator('[data-test="inventory-item-price"]');
    this.image = page.locator('.inventory_details_img');
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.removeButton = page.locator('[data-test^="remove"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  async backToProducts(): Promise<void> {
    await this.backButton.click();
  }

  async assertProductDetails(product: Product): Promise<void> {
    await Promise.all([
      expect(this.name).toHaveText(product.name),
      expect(this.description).toHaveText(product.description),
      expect(this.price).toHaveText(product.price),
      expect(this.image).toHaveAttribute('src', new RegExp(product.image)),
    ]);
  }
}

import { Locator, Page } from '@playwright/test';
import { CartBadgeComponent } from '@components/index';

export class ProductDetailPage {
  public readonly cartBadge: CartBadgeComponent;
  private readonly name: Locator;
  private readonly description: Locator;
  private readonly price: Locator;
  private readonly image: Locator;
  private readonly addToCartButton: Locator;
  private readonly removeButton: Locator;
  private readonly backButton: Locator;

  constructor(page: Page) {
    this.cartBadge = new CartBadgeComponent(page);
    this.name = page.locator('[data-test="inventory-item-name"]');
    this.description = page.locator('[data-test="inventory-item-desc"]');
    this.price = page.locator('[data-test="inventory-item-price"]');
    this.image = page.locator('.inventory_details_img');
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.removeButton = page.locator('[data-test^="remove"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  getName(): Promise<string> {
    return this.name.innerText();
  }

  getDescription(): Promise<string> {
    return this.description.innerText();
  }

  getPrice(): Promise<string> {
    return this.price.innerText();
  }

  async getImage(): Promise<string> {
    return (await this.image.getAttribute('src')) ?? '';
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
}

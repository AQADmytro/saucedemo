import { Locator, Page } from '@playwright/test';

export class CartBadgeComponent {
  public readonly badge: Locator;
  public readonly cartLink: Locator;

  constructor(page: Page) {
    this.badge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}

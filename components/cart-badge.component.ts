import { Locator, Page } from '@playwright/test';

export class CartBadgeComponent {
  private readonly badge: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    this.badge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  getCount(): Promise<string> {
    return this.badge.innerText();
  }

  isCartBadgeVisible(): Promise<boolean> {
    return this.badge.isVisible();
  }
}

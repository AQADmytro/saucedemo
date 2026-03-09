import { Locator, Page } from '@playwright/test';
import { CartItemsComponent, CartBadgeComponent } from '@components/index';

export class CartPage {
  public readonly items: CartItemsComponent;
  public readonly cartBadge: CartBadgeComponent;
  private readonly continueShoppingButton: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.items = new CartItemsComponent(page);
    this.cartBadge = new CartBadgeComponent(page);
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}

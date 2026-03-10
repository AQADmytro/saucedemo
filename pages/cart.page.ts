import { Locator, Page } from '@playwright/test';
import { CartItemsComponent, CartBadgeComponent } from '@components/index';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  public readonly items: CartItemsComponent;
  public readonly cartBadge: CartBadgeComponent;
  public readonly continueShoppingButton: Locator;
  public readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
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

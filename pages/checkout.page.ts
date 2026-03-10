import { expect, Locator, Page } from '@playwright/test';
import { CartItemsComponent, CartBadgeComponent } from '@components/index';
import { BasePage } from './base.page';
import { calculateSubtotal, calculateTax, calculateTotal, formatPrice } from '@utils/price.helper';
import { ShippingInfo } from '@types-app/checkout.type';

export class CheckoutPage extends BasePage {
  public readonly items: CartItemsComponent;
  public readonly cartBadge: CartBadgeComponent;
  public readonly firstNameInput: Locator;
  public readonly lastNameInput: Locator;
  public readonly postalCodeInput: Locator;
  public readonly continueButton: Locator;
  public readonly finishButton: Locator;
  public readonly errorMessage: Locator;
  public readonly summarySubtotal: Locator;
  public readonly summaryTax: Locator;
  public readonly summaryTotal: Locator;
  public readonly completeHeader: Locator;
  public readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.items = new CartItemsComponent(page);
    this.cartBadge = new CartBadgeComponent(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTax = page.locator('.summary_tax_label');
    this.summaryTotal = page.locator('.summary_total_label');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillShippingInfo(info: ShippingInfo): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async verifyPriceSummary(prices: string[]): Promise<void> {
    const subtotal = calculateSubtotal(prices);
    await Promise.all([
      expect(this.summarySubtotal).toContainText(formatPrice(subtotal)),
      expect(this.summaryTax).toContainText(formatPrice(calculateTax(subtotal))),
      expect(this.summaryTotal).toContainText(formatPrice(calculateTotal(subtotal))),
    ]);
  }

  async backToProducts(): Promise<void> {
    await this.backHomeButton.click();
  }
}

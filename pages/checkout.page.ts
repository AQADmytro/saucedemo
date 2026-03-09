import { Locator, Page } from '@playwright/test';
import { CartItemsComponent, CartBadgeComponent } from '@components/index';

export class CheckoutPage {
  public readonly items: CartItemsComponent;
  public readonly cartBadge: CartBadgeComponent;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly errorMessage: Locator;
  private readonly summarySubtotal: Locator;
  private readonly summaryTax: Locator;
  private readonly summaryTotal: Locator;
  private readonly completeHeader: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
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

  async fillShippingInfo(info: { firstName: string; lastName: string; postalCode: string }): Promise<void> {
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

  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }

  async getSubtotal(): Promise<string> {
    return this.summarySubtotal.innerText();
  }

  async getTax(): Promise<string> {
    return this.summaryTax.innerText();
  }

  async getTotal(): Promise<string> {
    return this.summaryTotal.innerText();
  }

  async getCompleteHeader(): Promise<string> {
    return this.completeHeader.innerText();
  }

  async backToProducts(): Promise<void> {
    await this.backHomeButton.click();
  }
}

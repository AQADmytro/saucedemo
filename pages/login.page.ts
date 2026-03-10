import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  public readonly usernameInput: Locator;
  public readonly passwordInput: Locator;
  public readonly loginButton: Locator;
  public readonly errorMessage: Locator;
  public readonly loginForm: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginForm = page.locator('[data-test="login-container"]');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async login(user: { username: string; password: string }): Promise<void> {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
}

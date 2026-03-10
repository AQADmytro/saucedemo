import { Locator, Page } from '@playwright/test';

export class BasePage {
  public readonly title: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('[data-test="title"]');
  }
}

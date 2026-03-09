import { Locator, Page } from '@playwright/test';

export class MenuComponent {
  private readonly menuOpenButton: Locator;
  private readonly menuCloseButton: Locator;
  private readonly menuContainer: Locator;
  private readonly menuItem: Locator;

  constructor(page: Page) {
    this.menuOpenButton = page.locator('#react-burger-menu-btn');
    this.menuCloseButton = page.locator('#react-burger-cross-btn');
    this.menuContainer = page.locator('.bm-menu-wrap');
    this.menuItem = this.menuContainer.locator('.menu-item');
  }

  async toggleMenu(action: 'open' | 'close'): Promise<void> {
    if (action === 'open') {
      await this.menuOpenButton.click();
      await this.menuContainer.waitFor({ state: 'visible' });
    } else {
      await this.menuCloseButton.click();
      await this.menuContainer.waitFor({ state: 'hidden' });
    }
  }

  async clickMenuItem(item: 'All Items' | 'About' | 'Logout' | 'Reset App State'): Promise<void> {
    await this.menuItem.filter({ hasText: item }).click();
  }

  async logout(): Promise<void> {
    await this.toggleMenu('open');
    await this.clickMenuItem('Logout');
  }

  async resetAppState(): Promise<void> {
    await this.toggleMenu('open');
    await this.clickMenuItem('Reset App State');
    await this.toggleMenu('close');
  }
}

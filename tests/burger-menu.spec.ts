import { test, expect } from '@fixtures/fixtures';
import { usersData, productsData, urlsData } from '@data/index';

test.describe('Burger Menu', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(usersData.standard.username, usersData.standard.password);
  });

  test('should navigate to About page via burger menu', async ({ productsPage, page }) => {
    await test.step('Open burger menu and click "About"', async () => {
      await productsPage.menu.toggleMenu('open');
      await productsPage.menu.clickMenuItem('About');
    });

    await test.step('Verify navigation to Sauce Labs website', async () => {
      await expect(page).toHaveURL(urlsData.sauceLabs);
    });
  });

  test('should navigate to all items from via menu', async ({ productsPage, page }) => {
    await test.step('Navigate to cart page', async () => {
      await productsPage.cartBadge.openCart();
    });

    await test.step('Open burger menu and click "All Items"', async () => {
      await productsPage.menu.toggleMenu('open');
      await productsPage.menu.clickMenuItem('All Items');
    });

    await test.step('Verify user is redirected to the products page', async () => {
      await expect(page).toHaveURL(urlsData.products);
    });
  });

  test('should reset app state via burger menu', async ({ productsPage }) => {
    await test.step('Add a product to the cart', async () => {
      await productsPage.addToCart(productsData.boltTShirt.name);
      expect(await productsPage.cartBadge.getCount()).toBe('1');
    });

    await test.step('Open burger menu and reset app state', async () => {
      await productsPage.menu.resetAppState();
    });

    await test.step('Verify cart is cleared', async () => {
      expect(await productsPage.cartBadge.isCartBadgeVisible()).toBe(false);
    });
  });
});

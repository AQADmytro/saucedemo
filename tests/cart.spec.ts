import { test, expect } from '@fixtures/fixtures';
import { usersData, productsData, urlsData } from '@data/index';

test.describe('Cart', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(usersData.standard.username, usersData.standard.password);
  });

  test('should manage cart items end-to-end  | @smoke', async ({ productsPage, cartPage, page }) => {
    await test.step('Add first product and verify badge shows 1', async () => {
      await productsPage.addToCart(productsData.boltTShirt.name);
      expect(await productsPage.cartBadge.getCount()).toBe('1');
    });

    await test.step('Add second product and verify badge shows 2', async () => {
      await productsPage.addToCart(productsData.fleeceJacket.name);
      expect(await productsPage.cartBadge.getCount()).toBe('2');
    });

    await test.step('Open cart and verify all products are listed', async () => {
      await productsPage.cartBadge.openCart();
      expect(await cartPage.items.getItemNames()).toEqual([
        productsData.boltTShirt.name,
        productsData.fleeceJacket.name,
      ]);
    });

    await test.step('Verify prices, descriptions and images for all cart items', async () => {
      for (const product of [productsData.boltTShirt, productsData.fleeceJacket]) {
        expect(await cartPage.items.getItemPrice(product.name)).toBe(product.price);
        expect(await cartPage.items.getItemDescription(product.name)).toBe(product.description);
      }
    });

    await test.step('Remove one product and verify cart has 1 item', async () => {
      await cartPage.items.removeItem(productsData.boltTShirt.name);
      expect(await cartPage.items.getCartItemCount()).toBe(1);
      expect(await productsPage.cartBadge.getCount()).toBe('1');
    });

    await test.step('Continue shopping and verify navigation to products page', async () => {
      await cartPage.continueShopping();
      await expect(page).toHaveURL(urlsData.products);
    });

    await test.step('Remove product from catalog page and verify badge disappears', async () => {
      await productsPage.removeFromCart(productsData.fleeceJacket.name);
      expect(await productsPage.cartBadge.isCartBadgeVisible()).toBe(false);
    });
  });
});

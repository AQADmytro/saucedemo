import { test, expect } from '@fixtures/fixtures';
import { usersData, productsData } from '@data/index';

test.describe('Cart', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(usersData.standard);
  });

  test('should manage cart items end-to-end  | @smoke', async ({ productsPage, cartPage }) => {
    await test.step('Add first product and verify badge shows 1', async () => {
      await productsPage.addToCart(productsData.boltTShirt.name);
      await expect(productsPage.cartBadge.badge).toHaveText('1');
    });

    await test.step('Add second product and verify badge shows 2', async () => {
      await productsPage.addToCart(productsData.fleeceJacket.name);
      await expect(productsPage.cartBadge.badge).toHaveText('2');
    });

    await test.step('Open cart and verify all products are listed', async () => {
      await productsPage.cartBadge.openCart();
      await expect(cartPage.items.itemName).toHaveText([productsData.boltTShirt.name, productsData.fleeceJacket.name]);
    });

    await test.step('Verify prices and descriptions for all cart items', async () => {
      await cartPage.items.verifyProducts([productsData.boltTShirt, productsData.fleeceJacket]);
    });

    await test.step('Remove one product and verify cart has 1 item', async () => {
      await cartPage.items.removeItem(productsData.boltTShirt.name);
      await expect(cartPage.items.item).toHaveCount(1);
      await expect(productsPage.cartBadge.badge).toHaveText('1');
    });

    await test.step('Continue shopping and verify navigation to products page', async () => {
      await cartPage.continueShopping();
      await expect(productsPage.title).toHaveText('Products');
    });

    await test.step('Remove product from catalog page and verify badge disappears', async () => {
      await productsPage.removeFromCart(productsData.fleeceJacket.name);
      await expect(productsPage.cartBadge.badge).toBeHidden();
    });
  });
});

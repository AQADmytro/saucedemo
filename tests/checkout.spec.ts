import { test, expect } from '@fixtures/fixtures';
import { usersData, checkoutInfo, checkoutValidationCases, productsData } from '@data/index';

test.describe('Checkout', () => {
  const products = [productsData.boltTShirt, productsData.onesie, productsData.fleeceJacket];

  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.open();
    await loginPage.login(usersData.standard);
    for (const product of products) {
      await productsPage.addToCart(product.name);
    }
    await productsPage.cartBadge.openCart();
  });

  test('should complete full checkout flow  | @smoke', async ({ cartPage, checkoutPage, productsPage }) => {
    await test.step('Proceed to checkout from cart', async () => {
      await cartPage.proceedToCheckout();
      await expect(checkoutPage.title).toHaveText('Checkout: Your Information');
    });

    await test.step('Fill in shipping information and continue', async () => {
      await checkoutPage.fillShippingInfo(checkoutInfo);
      await checkoutPage.continue();
      await expect(checkoutPage.title).toHaveText('Checkout: Overview');
    });

    await test.step('Verify all ordered items are listed', async () => {
      await expect(checkoutPage.items.itemName).toHaveText(products.map((p) => p.name));
    });

    await test.step('Verify price and description for each item', async () => {
      await checkoutPage.items.verifyProducts(products);
    });

    await test.step('Verify subtotal, tax and total are calculated correctly', async () => {
      await checkoutPage.verifyPriceSummary(products.map((p) => p.price));
    });

    await test.step('Confirm order and verify completion', async () => {
      await checkoutPage.finish();
      await expect(checkoutPage.title).toHaveText('Checkout: Complete!');
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });

    await test.step('Click "Back to Products" and verify navigation', async () => {
      await checkoutPage.backToProducts();
      await expect(productsPage.title).toHaveText('Products');
    });
  });

  for (const { title, shippingInfo, expectedError } of checkoutValidationCases) {
    test(`should show error when ${title}`, async ({ cartPage, checkoutPage }) => {
      await test.step('Proceed to checkout and submit form', async () => {
        await cartPage.proceedToCheckout();
        await checkoutPage.fillShippingInfo(shippingInfo);
        await checkoutPage.continue();
      });

      await test.step(`Verify error: ${expectedError}`, async () => {
        await expect(checkoutPage.errorMessage).toHaveText(expectedError);
      });
    });
  }
});

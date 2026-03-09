import { test, expect } from '@fixtures/fixtures';
import { usersData, checkoutInfo, checkoutValidationCases, productsData, urlsData } from '@data/index';
import { calculateSubtotal, calculateTax, calculateTotal, formatPrice } from '@utils/price.helper';

test.describe('Checkout', () => {
  const cartProducts = [productsData.boltTShirt, productsData.onesie, productsData.fleeceJacket];

  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.open();
    await loginPage.login(usersData.standard.username, usersData.standard.password);
    for (const product of cartProducts) {
      await productsPage.addToCart(product.name);
    }
    await productsPage.cartBadge.openCart();
  });

  test('should complete full checkout flow  | @smoke', async ({ cartPage, checkoutPage, page }) => {
    await test.step('Proceed to checkout from cart', async () => {
      await cartPage.proceedToCheckout();
      await expect(page).toHaveURL(urlsData.checkoutStepOne);
    });

    await test.step('Fill in shipping information and continue', async () => {
      await checkoutPage.fillShippingInfo(checkoutInfo);
      await checkoutPage.continue();
      await expect(page).toHaveURL(urlsData.checkoutStepTwo);
    });

    await test.step('Verify all ordered items are listed', async () => {
      expect(await checkoutPage.items.getItemNames()).toEqual(cartProducts.map((p) => p.name));
    });

    await test.step('Verify price and description for each item', async () => {
      for (const product of cartProducts) {
        expect(await checkoutPage.items.getItemPrice(product.name)).toBe(product.price);
        expect(await checkoutPage.items.getItemDescription(product.name)).toBe(product.description);
      }
    });

    await test.step('Verify subtotal, tax and total are calculated correctly', async () => {
      const subtotalAmount = calculateSubtotal(cartProducts.map((p) => p.price));
      expect(await checkoutPage.getSubtotal()).toContain(formatPrice(subtotalAmount));
      expect(await checkoutPage.getTax()).toContain(formatPrice(calculateTax(subtotalAmount)));
      expect(await checkoutPage.getTotal()).toContain(formatPrice(calculateTotal(subtotalAmount)));
    });

    await test.step('Confirm order and verify completion', async () => {
      await checkoutPage.finish();
      await expect(page).toHaveURL(urlsData.checkoutComplete);
      expect(await checkoutPage.getCompleteHeader()).toBe('Thank you for your order!');
    });

    await test.step('Click "Back to Products" and verify navigation', async () => {
      await checkoutPage.backToProducts();
      await expect(page).toHaveURL(urlsData.products);
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
        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain(expectedError);
      });
    });
  }
});

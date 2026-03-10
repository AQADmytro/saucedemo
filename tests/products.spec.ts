import { test, expect } from '@fixtures/fixtures';
import { usersData, productsData } from '@data/index';

test.describe('Products Page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(usersData.standard);
  });

  test('should display correct product card details', async ({ productsPage }) => {
    for (const product of Object.values(productsData)) {
      await test.step(`Verify card details for "${product.name}"`, async () => {
        await productsPage.verifyProductCard(product);
      });
    }
  });

  test('should open product detail and verify all attributes  | @smoke', async ({
    productsPage,
    productDetailPage,
  }) => {
    const product = productsData.boltTShirt;

    await test.step('Click product image and verify navigation to detail page', async () => {
      await productsPage.openProductDetail(product.name, 'image');
    });

    await test.step('Verify product name, description, image and price', async () => {
      await productDetailPage.assertProductDetails(product);
    });

    await test.step('Add product to cart and verify badge shows 1', async () => {
      await productDetailPage.addToCart();
      await expect(productDetailPage.cartBadge.badge).toHaveText('1');
    });

    await test.step('Remove product from cart and verify badge disappears', async () => {
      await productDetailPage.removeFromCart();
      await expect(productDetailPage.cartBadge.badge).toBeHidden();
    });

    await test.step('Click "Back to Products" and verify navigation', async () => {
      await productDetailPage.backToProducts();
      await expect(productsPage.title).toHaveText('Products');
    });
  });

  test('should sort products by all available options', async ({ productsPage }) => {
    await test.step('Sort by Name (A to Z) and verify alphabetical order', async () => {
      await productsPage.sortBy('name: a-z');
      await productsPage.verifySorting('name', 'asc');
    });

    await test.step('Sort by Name (Z to A) and verify reverse alphabetical order', async () => {
      await productsPage.sortBy('name: z-a');
      await productsPage.verifySorting('name', 'desc');
    });

    await test.step('Sort by Price (low to high) and verify ascending order', async () => {
      await productsPage.sortBy('price: low-high');
      await productsPage.verifySorting('price', 'asc');
    });

    await test.step('Sort by Price (high to low) and verify descending order', async () => {
      await productsPage.sortBy('price: high-low');
      await productsPage.verifySorting('price', 'desc');
    });
  });
});

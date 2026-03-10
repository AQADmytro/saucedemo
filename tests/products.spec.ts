import { test, expect } from '@fixtures/fixtures';
import { usersData, productsData, urlsData } from '@data/index';

test.describe('Products Page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(usersData.standard);
  });

  test('should display correct product card details', async ({ productsPage }) => {
    for (const product of Object.values(productsData)) {
      await test.step(`Verify card details for "${product.name}"`, async () => {
        expect(await productsPage.getProductPrice(product.name)).toBe(product.price);
        expect(await productsPage.getProductDescription(product.name)).toBe(product.description);
        expect(await productsPage.getProductImage(product.name)).toContain(product.image);
      });
    }
  });

  test('should open product detail and verify all attributes  | @smoke', async ({ productsPage, productDetailPage, page }) => {
    const product = productsData.boltTShirt;

    await test.step('Click product image and verify navigation to detail page', async () => {
      await productsPage.openProductDetail(product.name, 'image');
      await expect(page).toHaveURL(urlsData.productDetail);
    });

    await test.step('Verify product name, description, image and price', async () => {
      expect(await productDetailPage.getName()).toBe(product.name);
      expect(await productDetailPage.getDescription()).toBe(product.description);
      expect(await productDetailPage.getPrice()).toBe(product.price);
      expect(await productDetailPage.getImage()).toContain(product.image);
    });

    await test.step('Add product to cart and verify badge shows 1', async () => {
      await productDetailPage.addToCart();
      expect(await productDetailPage.cartBadge.getCount()).toBe('1');
    });

    await test.step('Remove product from cart and verify badge disappears', async () => {
      await productDetailPage.removeFromCart();
      expect(await productDetailPage.cartBadge.isCartBadgeVisible()).toBe(false);
    });

    await test.step('Click "Back to Products" and verify navigation to products page', async () => {
      await productDetailPage.backToProducts();
      await expect(page).toHaveURL(urlsData.products);
    });
  });

  test('should sort products by all available options', async ({ productsPage }) => {
    await test.step('Sort by Name (A to Z) and verify alphabetical order', async () => {
      await productsPage.sortBy('name: a-z');
      expect(await productsPage.isSorted('name', 'asc')).toBe(true);
    });

    await test.step('Sort by Name (Z to A) and verify reverse alphabetical order', async () => {
      await productsPage.sortBy('name: z-a');
      expect(await productsPage.isSorted('name', 'desc')).toBe(true);
    });

    await test.step('Sort by Price (low to high) and verify ascending order', async () => {
      await productsPage.sortBy('price: low-high');
      expect(await productsPage.isSorted('price', 'asc')).toBe(true);
    });

    await test.step('Sort by Price (high to low) and verify descending order', async () => {
      await productsPage.sortBy('price: high-low');
      expect(await productsPage.isSorted('price', 'desc')).toBe(true);
    });
  });
});

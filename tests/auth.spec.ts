import { test, expect } from '@fixtures/fixtures';
import { usersData, loginErrorCases, urlsData } from '@data/index';

test.describe('Authentication', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('should login and logout successfully | @smoke', async ({ loginPage, productsPage, page }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(usersData.standard.username, usersData.standard.password);
      await expect(page).toHaveURL(urlsData.products);
    });

    await test.step('Open burger menu, logout and verify login form', async () => {
      await productsPage.menu.logout();
      await expect(page).toHaveURL(urlsData.login);
      expect(await loginPage.isLoginFormVisible()).toBe(true);
    });
  });

  loginErrorCases.forEach(({ title, username, password, expectedError }) => {
    test(`should show error for ${title}`, async ({ loginPage }) => {
      await test.step('Submit login form', async () => {
        await loginPage.login(username, password);
      });

      await test.step('Verify error message', async () => {
        expect(await loginPage.getErrorMessage()).toContain(expectedError);
      });
    });
  });
});

import { test, expect } from '@fixtures/fixtures';
import { usersData, loginErrorCases } from '@data/index';

test.describe('Authentication', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('should login and logout successfully | @smoke', async ({ loginPage, productsPage }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(usersData.standard);
      await expect(productsPage.title).toHaveText('Products');
    });

    await test.step('Open burger menu, logout and verify login form', async () => {
      await productsPage.menu.logout();
      await expect(loginPage.loginForm).toBeVisible();
    });
  });

  loginErrorCases.forEach(({ title, user, expectedError }) => {
    test(`should show error for ${title}`, async ({ loginPage }) => {
      await test.step('Submit login form', async () => {
        await loginPage.login(user);
      });

      await test.step('Verify error message', async () => {
        await expect(loginPage.errorMessage).toHaveText(expectedError);
      });
    });
  });
});

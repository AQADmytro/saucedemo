# Sauce Demo - Playwright Test Automation

Automated UI tests for [saucedemo.com](https://www.saucedemo.com/) built with Playwright and TypeScript.

## Tech Stack

- **Playwright** - test framework
- **TypeScript** - language
- **ESLint + Prettier** - linting and formatting

## Project Structure

```
sauce-demo/
├── components/
│   ├── index.ts                  # Barrel export
│   ├── cart-badge.component.ts   # Cart badge
│   ├── cart-items.component.ts   # Cart item list actions
│   └── menu.component.ts         # Burger menu actions
├── pages/
│   ├── index.ts                  # Barrel export
│   ├── login.page.ts
│   ├── products.page.ts
│   ├── product-detail.page.ts
│   ├── cart.page.ts
│   └── checkout.page.ts
├── fixtures/
│   └── fixtures.ts               # Custom fixtures extending Playwright base test
├── data/
│   ├── index.ts                  # Barrel export
│   ├── urls.data.ts              # All app URLs and route patterns
│   ├── users.data.ts
│   ├── products.data.ts
│   ├── checkout.data.ts
│   ├── error-messages.data.ts
│   └── test-cases/
│       ├── auth.cases.ts         # Data-driven auth error cases
│       └── checkout.cases.ts     # Data-driven checkout validation cases
├── utils/
│   └── price.helper.ts           # Price calculation helpers
├── tests/
│   ├── auth.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── burger-menu.spec.ts
├── global-setup.ts               # Cleans test artefact before each run
├── playwright.config.ts
├── BUG_REPORT.md                 # Manual testing findings
├── eslint.config.cjs
├── .prettierrc
└── tsconfig.json
```

## Getting Started

```bash
npm install
npx playwright install chromium
```

## Running Tests

```bash
npm test                        # all tests (headless)
npm run test:smoke              # smoke tests only
npm run test:headed             # all tests (with browser)
```

## Test Coverage

| Area           | Smoke | Scenarios                                                                                                      |
| -------------- | :---: | -------------------------------------------------------------------------------------------------------------- |
| Authentication |  ✅   | Login/logout e2e, locked out user, empty fields, invalid credentials                                           |
| Products       |  ✅   | Product card details, product detail page (attributes, add/remove cart, back navigation), sorting by name/price |
| Cart           |  ✅   | Add/remove items, badge count, verify price and description, continue shopping                                  |
| Checkout       |  ✅   | Full flow, validation errors (first/last name, postal code), order summary, back to products                   |
| Burger Menu    |       | About page navigation, all items link, reset app state                                                         |

## Architecture

### Page Object Model

Each page is represented by a dedicated class. Locators are defined as `private readonly` properties. Methods describe user actions, not DOM interactions. No business logic or assertions live inside page objects.

### Components

Reusable UI pieces that appear across multiple pages are extracted into `components/`. All three components are composed into page objects as `public readonly` properties:

- `CartBadgeComponent`
- `CartItemsComponent`
- `MenuComponent`

### Custom Fixtures

The base Playwright `test` is extended in `fixtures/fixtures.ts` to provide initialized page objects. Tests always import `test` and `expect` from `@fixtures/fixtures` — never directly from `@playwright/test`.

### Test Data

All test data (users, products, URLs, etc.) is centralized in `data/` and exported via `index.ts`.

## Code Quality

```bash
npm run lint          # ESLint check
npm run lint:fix      # ESLint autofix
npm run format        # Prettier format
npm run format:check  # Prettier check
```

---

## Limitations

- **No tests for broken users.**

- **No visual regression testing.** 

- **No mobile / responsive coverage.**

- **No API testing.** 

- **No accessibility testing.** 

- **No performance assertions.** 

- **Retries are set to 1.** 

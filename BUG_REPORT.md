# Bug Report - SauceDemo
---

## 🔴 Critical

- **BUG-001** · `problem_user` · All product images are broken (same image for all 6 items)
- **BUG-002** · `problem_user` · Clicking a product name opens the wrong product detail page (e.g. Backpack -> Fleece Jacket)
- **BUG-003** · `problem_user` · "Add to Cart" has no effect for some products
- **BUG-004** · `problem_user` · "Remove" button on catalog page has no effect for some products
- **BUG-005** · `problem_user` · Sorting does not work
- **BUG-006** · `problem_user` · Last Name field is not accessible
- **BUG-007** · `error_user` · Checkout form submits without Last Name

---

## 🟠 High

- **BUG-008** · `error_user` · Last Name field does not accept any keyboard input
- **BUG-009** · `all users` · Checkout proceeds with an empty cart
- **BUG-010** · `error_user` · Cancel on Checkout: Overview redirects to product list instead of back to shipping details
- **BUG-011** · `visual_user` · Sauce Labs Backpack displays a wrong image; all other products render correctly
- **BUG-012** · `visual_user` · All product prices are wrong (e.g. Backpack: $29.99 -> $53.55, Onesie: $7.99 -> $35.59)
- **BUG-013** · `all users` · No product images on cart/checkout pages

---

## 🟡 Medium

- **BUG-014** · `all users` · Cart contents persist after logout and are shared across user sessions
- **BUG-015** · `all users` · No quantity control - only one unit per product can be added; duplicate items are not possible
- **BUG-016** · `all users` · Product name displayed as "Test.allTheThings() T-Shirt (Red)"
- **BUG-017** · `performance_glitch_user` · Login takes ~5 seconds

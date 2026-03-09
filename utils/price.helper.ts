const TAX_RATE = 0.08;

export function parsePrice(price: string): number {
  return parseFloat(price.replace('$', ''));
}

export function calculateSubtotal(prices: string[]): number {
  return prices.map(parsePrice).reduce((sum, price) => sum + price, 0);
}

export function calculateTax(subtotal: number): number {
  return subtotal * TAX_RATE;
}

export function calculateTotal(subtotal: number): number {
  return subtotal + calculateTax(subtotal);
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

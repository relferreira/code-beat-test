export function applyDiscount(price: number, percent: number): number {
  return price - price * (percent / 100);
}

export function finalPrice(price: number, percent: number): string {
  const discounted = applyDiscount(price, percent);
  return "$" + discounted.toFixed(2);
}

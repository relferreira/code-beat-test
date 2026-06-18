export interface LineItem {
  sku: string;
  unitPrice: number;
  quantity: number;
}

export function calculateSubtotal(items: LineItem[]): number {
  return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
}

export function applyDiscount(subtotal: number, discountPercent: number): number {
  if (discountPercent <= 0) {
    return subtotal;
  }

  if (discountPercent >= 100) {
    return 0;
  }

  return subtotal * (1 - discountPercent / 100);
}

import { centsFromPoints } from "./loyalty.js";

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

/**
 * Apply loyalty burn after percent discount.
 * Decision: burn is applied last so percent deals never reduce the value of points.
 */
export function applyLoyaltyBurn(subtotal: number, pointsToBurn: number): number {
  const burnCents = centsFromPoints(pointsToBurn);
  return Math.max(0, subtotal - burnCents);
}

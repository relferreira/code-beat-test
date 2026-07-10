/**
 * Loyalty points accrual for checkout.
 *
 * Design choice: keep points as integers (cents → points at 1:1 of whole dollars)
 * rather than floats, so balances stay exact without rounding drift.
 */
export function pointsForSubtotal(subtotalCents: number): number {
  if (!Number.isFinite(subtotalCents) || subtotalCents <= 0) {
    return 0;
  }

  // Whole dollars only; fractional cents do not earn points.
  return Math.floor(subtotalCents / 100);
}

/**
 * Apply a fixed point burn as a discount in cents.
 * Trade-off: 1 point = 1 cent for simplicity; no tiered burn rates yet.
 */
export function centsFromPoints(points: number): number {
  if (!Number.isFinite(points) || points <= 0) {
    return 0;
  }

  return Math.floor(points);
}

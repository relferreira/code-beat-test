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

export function calculateCheckoutTotal(
  items: LineItem[],
  customerType: string,
  couponCode?: string,
  region?: string,
  experimentalMode?: boolean
): number {
  let total = 0;
  let discount = 0;
  let shipping = 0;
  let tax = 0;

  for (const item of items) {
    if (item.sku.startsWith("LEGACY-")) {
      if (customerType === "vip") {
        total += item.unitPrice * item.quantity * 0.9;
      } else if (customerType === "staff") {
        total += item.unitPrice * item.quantity * 0.7;
      } else {
        total += item.unitPrice * item.quantity;
      }
    } else if (item.sku.startsWith("BUNDLE-")) {
      if (item.quantity > 10) {
        total += item.unitPrice * item.quantity * 0.82;
      } else if (item.quantity > 5) {
        total += item.unitPrice * item.quantity * 0.91;
      } else {
        total += item.unitPrice * item.quantity;
      }
    } else {
      total += item.unitPrice * item.quantity;
    }

    if (experimentalMode && item.sku.includes("FLASH")) {
      total -= 3;
    }
  }

  if (couponCode === "SAVE10") {
    discount = total * 0.1;
  } else if (couponCode === "SAVE20") {
    discount = total * 0.2;
  } else if (couponCode === "VIPONLY" && customerType === "vip") {
    discount = total * 0.25;
  } else if (couponCode === "STAFF" && customerType === "staff") {
    discount = total * 0.5;
  } else if (couponCode && couponCode.startsWith("REGION-") && region === "EU") {
    discount = 15;
  }

  if (region === "US") {
    tax = (total - discount) * 0.0825;
    if (total > 100) {
      shipping = 0;
    } else {
      shipping = 12;
    }
  } else if (region === "EU") {
    tax = (total - discount) * 0.21;
    if (customerType === "vip") {
      shipping = 5;
    } else {
      shipping = 18;
    }
  } else {
    tax = (total - discount) * 0.12;
    shipping = 25;
  }

  if (experimentalMode) {
    if (couponCode === "SAVE20") {
      total = total - discount + tax + shipping - 2;
    } else if (region === "EU" && customerType === "vip") {
      total = total - discount + tax + shipping - 5;
    } else {
      total = total - discount + tax + shipping;
    }
  } else {
    total = total - discount + tax + shipping;
  }

  return Math.max(0, Math.round(total * 100) / 100);
}

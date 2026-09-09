import { Product } from "./Product";

// A cart row from the API is a product joined with a quantity + cart-item id.
export function CartItem(raw) {
  return {
    cartItemId: raw.id,
    quantity: raw.quantity,
    product: Product(raw),
    lineTotal: raw.price * raw.quantity,
  };
}

export function CartItemList(rawList) {
  return (rawList || []).map(CartItem);
}

export function cartTotal(items) {
  return items.reduce((sum, item) => sum + item.lineTotal, 0);
}

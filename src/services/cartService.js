import productsData from "../data/products.json";

// Fully offline — cart lives in memory for the lifetime of the app session
// (resets on reload, same as a real cart would reset if you cleared cookies
// before ever logging in). No network call, no backend needed.

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

let cartStore = []; // [{ id, productId, quantity }]

function genId() {
  return `c_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function toRaw(item) {
  const product = productsData.find((p) => p.id === item.productId);
  if (!product) return null;
  return {
    id: item.id,
    quantity: item.quantity,
    ...product,
    was_price: product.wasPrice ?? null,
  };
}

function currentCart() {
  return cartStore.map(toRaw).filter(Boolean);
}

export const cartService = {
  async list() {
    await delay();
    return currentCart();
  },

  async addItem(userId, productId, quantity = 1) {
    await delay();
    const existing = cartStore.find((i) => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cartStore.push({ id: genId(), productId, quantity });
    }
    return currentCart();
  },

  async updateQuantity(itemId, quantity) {
    await delay();
    const item = cartStore.find((i) => i.id === itemId);
    if (!item) throw new Error("Cart item not found");
    item.quantity = quantity;
    return currentCart();
  },

  async removeItem(itemId) {
    await delay();
    cartStore = cartStore.filter((i) => i.id !== itemId);
    return currentCart();
  },

  // Used internally by ordersService to clear the cart after checkout.
  _clear() {
    cartStore = [];
  },

  // Exposed so ordersService can read the current cart without a round trip.
  _peek() {
    return currentCart();
  },
};

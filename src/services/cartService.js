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
  // id is the cart row's own id; productId is kept separate so it never
  // collides with the product's id (they're different things once a user
  // can hold more than one unit of one product in one row).
  return {
    id: item.id,
    productId: product.id,
    quantity: item.quantity,
    name: product.name,
    category: product.category,
    price: product.price,
    was_price: product.wasPrice ?? null,
    description: product.description,
    icon: product.icon,
    color: product.color,
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
      if (existing.quantity <= 0) {
        cartStore = cartStore.filter((i) => i.id !== existing.id);
      }
    } else if (quantity > 0) {
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

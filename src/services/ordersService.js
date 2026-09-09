import { cartService } from "./cartService";

// Fully offline — checkout converts the in-memory cart into an order object
// and clears the cart. Order history lives only for the app session (not
// persisted), which is fine for a training POC that doesn't need a database.

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

let orderHistory = [];

function genId() {
  return `o_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export const ordersService = {
  async checkout() {
    await delay();
    const cartItems = cartService._peek();
    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = {
      id: genId(),
      status: "placed",
      total,
      created_at: new Date().toISOString(),
      items: cartItems.map((item) => ({
        name: item.name,
        icon: item.icon,
        quantity: item.quantity,
        unit_price: item.price,
      })),
    };

    orderHistory.unshift(order);
    cartService._clear();
    return order;
  },

  async history() {
    await delay();
    return orderHistory;
  },

  async getById(id) {
    await delay();
    const order = orderHistory.find((o) => o.id === id);
    if (!order) throw new Error("Order not found");
    return order;
  },
};

import productsData from "../data/products.json";

// Fully offline — reads the bundled products.json instead of calling a
// backend. The ViewModel layer above doesn't know or care that this
// changed; list()/getById() keep the same signature and return shape
// (raw objects with a was_price key) that the Product model expects.

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

function toRaw(item) {
  // products.json uses camelCase (wasPrice); the Product model expects
  // was_price to mirror what a real backend row would look like.
  return { ...item, was_price: item.wasPrice ?? null };
}

export const productsService = {
  async list(filters = {}) {
    await delay();
    let items = productsData.map(toRaw);

    if (filters.category) {
      items = items.filter((p) => p.category === filters.category);
    }
    if (filters.minPrice != null) {
      items = items.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice != null) {
      items = items.filter((p) => p.price <= Number(filters.maxPrice));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }

    return items;
  },

  async getById(id) {
    await delay();
    const item = productsData.find((p) => p.id === id);
    if (!item) throw new Error("Product not found");
    return toRaw(item);
  },
};

import { DATA_BASE_URL } from "./config";

// Fetches the catalog from a hosted JSON file over HTTPS instead of
// bundling it locally. The ViewModel layer above doesn't know or care;
// list()/getById() keep the same signature and return shape (raw objects
// with a was_price key) that the Product model expects.

function toRaw(item) {
  // products.json uses camelCase (wasPrice); the Product model expects
  // was_price to mirror what a real backend row would look like.
  return { ...item, was_price: item.wasPrice ?? null };
}

async function fetchProducts() {
  const res = await fetch(`${DATA_BASE_URL}/products.json`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export const productsService = {
  async list(filters = {}) {
    const productsData = await fetchProducts();
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
    if (filters.color) {
      items = items.filter(
        (p) => p.color === filters.color || (p.colors || []).includes(filters.color)
      );
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }

    return items;
  },

  async getById(id) {
    const productsData = await fetchProducts();
    const item = productsData.find((p) => p.id === id);
    if (!item) throw new Error("Product not found");
    return toRaw(item);
  },
};

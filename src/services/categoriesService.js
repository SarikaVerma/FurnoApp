import { DATA_BASE_URL } from "./config";

export const categoriesService = {
  async list() {
    const res = await fetch(`${DATA_BASE_URL}/categories.json`);
    if (!res.ok) throw new Error("Failed to load categories");
    return res.json();
  },
};

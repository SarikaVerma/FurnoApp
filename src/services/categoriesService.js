import categoriesData from "../data/categories.json";

export const categoriesService = {
  async list() {
    return new Promise((resolve) => setTimeout(() => resolve(categoriesData), 100));
  },
};

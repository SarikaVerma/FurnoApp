import reviewsData from "../data/reviews.json";

export const reviewsService = {
  async listByProduct(productId) {
    const filtered = reviewsData.filter((r) => r.productId === productId);
    return new Promise((resolve) => setTimeout(() => resolve(filtered), 150));
  },

  async listAll() {
    return new Promise((resolve) => setTimeout(() => resolve(reviewsData), 150));
  },
};

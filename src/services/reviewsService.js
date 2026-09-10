import { DATA_BASE_URL } from "./config";

async function fetchReviews() {
  const res = await fetch(`${DATA_BASE_URL}/reviews.json`);
  if (!res.ok) throw new Error("Failed to load reviews");
  return res.json();
}

export const reviewsService = {
  async listByProduct(productId) {
    const reviewsData = await fetchReviews();
    return reviewsData.filter((r) => r.productId === productId);
  },

  async listAll() {
    return fetchReviews();
  },
};

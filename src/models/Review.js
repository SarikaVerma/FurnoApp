export function Review(raw) {
  return {
    id: raw.id,
    productId: raw.productId,
    name: raw.name,
    rating: raw.rating,
    text: raw.text,
    createdAt: raw.createdAt,
  };
}

export function ReviewList(rawList) {
  return (rawList || []).map(Review);
}

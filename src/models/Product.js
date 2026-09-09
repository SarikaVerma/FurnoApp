// Model: normalizes a raw product row from the API into the shape the
// app's views expect. Keeps backend column names (snake_case) out of
// the UI layer.
export function Product(raw) {
  return {
    id: raw.id,
    name: raw.name,
    category: raw.category,
    price: raw.price,
    wasPrice: raw.was_price ?? null,
    description: raw.description ?? "",
    icon: raw.icon ?? "sofa",
    color: raw.color ?? "#D0233A",
  };
}

export function ProductList(rawList) {
  return (rawList || []).map(Product);
}

export function OrderItem(raw) {
  return {
    name: raw.name,
    icon: raw.icon,
    quantity: raw.quantity,
    unitPrice: raw.unit_price,
    lineTotal: raw.unit_price * raw.quantity,
  };
}

export function Order(raw) {
  return {
    id: raw.id,
    status: raw.status,
    total: raw.total,
    createdAt: raw.created_at,
    eta: raw.eta,
    items: (raw.items || []).map(OrderItem),
  };
}

export function User(raw) {
  return {
    id: raw.id,
    name: raw.name,
    phone: raw.phone,
    city: raw.city,
    avatarUrl: raw.avatarUrl ?? null,
    furpayBalance: raw.furpayBalance ?? 0,
    notifications: raw.notifications ?? {},
    paymentMethods: raw.paymentMethods ?? [],
  };
}

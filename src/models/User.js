export function User(raw) {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    city: raw.city,
    avatarUrl: raw.avatarUrl ?? null,
    furpayBalance: raw.furpayBalance ?? 0,
    notifications: raw.notifications ?? {},
    paymentMethods: raw.paymentMethods ?? [],
  };
}

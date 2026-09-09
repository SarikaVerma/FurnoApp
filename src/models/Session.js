export function Session(raw) {
  return {
    id: raw.id,
    phone: raw.phone,
    name: raw.name,
  };
}

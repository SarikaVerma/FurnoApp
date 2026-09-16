export function Session(raw) {
  return {
    id: raw.id,
    email: raw.email,
    name: raw.name,
  };
}

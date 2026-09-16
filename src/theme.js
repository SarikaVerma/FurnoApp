// Design tokens. All screens pull color from here — update a value once
// and it cascades everywhere (headers, buttons, prices, active states).
// Palette: muted/dusty pastels rather than the earlier saturated
// orange/crimson, kept just dark enough on the accent tones (crimson,
// plum) that button labels and price text stay legible on white.
export const colors = {
  gradFrom: "#F6C9A0",
  gradTo: "#E8A6A0",
  plum: "#8B6A87",
  crimson: "#BF6E72",
  ink: "#3A2E38",
  muted: "#9C8F98",
  cream: "#FBF8F6",
  line: "#EFE7E4",
  chip: "#FBEEEA",
  white: "#FFFFFF",
};

export const catalog = [
  { id: "1", name: "Sofa", price: 505, was: 719, icon: "sofa" },
  { id: "2", name: "Armchair", price: 220, was: 279, icon: "armchair" },
  { id: "3", name: "Bed", price: 760, was: 919, icon: "bed" },
  { id: "4", name: "Chair", price: 45, was: 79, icon: "chair" },
  { id: "5", name: "Sofa", price: 505, was: 719, icon: "sofa" },
];

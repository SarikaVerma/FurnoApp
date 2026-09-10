import React from "react";
import Svg, { Rect, Line, Ellipse, Circle, Path } from "react-native-svg";

// Small flat-style furniture illustrations, one per catalog icon key, each
// tinted with the product's own accent color instead of a fixed palette —
// this is what lets two products sharing a silhouette (the two sofas) still
// read as visually distinct items, and it's why these are drawn as shapes
// rather than photos: no image hosting, no extra network round trip, same
// tech (react-native-svg) the Lucide icons already use under the hood.
const SHAPES = {
  sofa: (color) => (
    <>
      <Rect x="8" y="26" width="48" height="16" rx="5" fill={color} />
      <Rect x="10" y="12" width="44" height="18" rx="7" fill={color} />
      <Rect x="4" y="22" width="11" height="26" rx="5" fill={color} />
      <Rect x="49" y="22" width="11" height="26" rx="5" fill={color} />
      <Rect x="10" y="40" width="44" height="10" rx="4" fill="#000" opacity={0.12} />
      <Line x1="32" y1="14" x2="32" y2="28" stroke="#fff" strokeOpacity={0.4} strokeWidth="2" />
      <Rect x="10" y="50" width="5" height="7" rx="2" fill={color} opacity={0.7} />
      <Rect x="49" y="50" width="5" height="7" rx="2" fill={color} opacity={0.7} />
    </>
  ),
  armchair: (color) => (
    <>
      <Path d="M14 30 Q14 16 26 16 L38 16 Q50 16 50 30 L50 40 L14 40 Z" fill={color} />
      <Rect x="10" y="30" width="8" height="20" rx="4" fill={color} />
      <Rect x="46" y="30" width="8" height="20" rx="4" fill={color} />
      <Rect x="14" y="40" width="36" height="10" rx="4" fill="#000" opacity={0.12} />
      <Rect x="16" y="50" width="5" height="7" rx="2" fill={color} opacity={0.7} />
      <Rect x="43" y="50" width="5" height="7" rx="2" fill={color} opacity={0.7} />
    </>
  ),
  bed: (color) => (
    <>
      <Rect x="8" y="20" width="8" height="26" rx="2" fill={color} />
      <Rect x="10" y="24" width="44" height="8" rx="3" fill={color} opacity={0.85} />
      <Rect x="8" y="34" width="48" height="12" rx="3" fill={color} />
      <Ellipse cx="20" cy="30" rx="7" ry="5" fill="#fff" opacity={0.55} />
      <Rect x="8" y="46" width="48" height="5" rx="2" fill={color} opacity={0.6} />
    </>
  ),
  chair: (color) => (
    <>
      <Rect x="16" y="14" width="32" height="8" rx="2" fill={color} />
      <Rect x="16" y="22" width="4" height="16" fill={color} opacity={0.8} />
      <Rect x="44" y="22" width="4" height="16" fill={color} opacity={0.8} />
      <Rect x="14" y="38" width="36" height="5" rx="1.5" fill={color} />
      <Rect x="16" y="43" width="4" height="14" fill={color} />
      <Rect x="44" y="43" width="4" height="14" fill={color} />
    </>
  ),
  bookshelf: (color) => (
    <>
      <Rect x="12" y="8" width="40" height="48" rx="2" fill="none" stroke={color} strokeWidth="4" />
      <Line x1="12" y1="22" x2="52" y2="22" stroke={color} strokeWidth="4" />
      <Line x1="12" y1="36" x2="52" y2="36" stroke={color} strokeWidth="4" />
      <Rect x="17" y="12" width="8" height="6" fill={color} opacity={0.5} />
      <Rect x="30" y="26" width="10" height="6" fill={color} opacity={0.5} />
    </>
  ),
  table: (color) => (
    <>
      <Rect x="10" y="20" width="44" height="8" rx="3" fill={color} />
      <Rect x="14" y="28" width="4" height="20" fill={color} opacity={0.85} />
      <Rect x="46" y="28" width="4" height="20" fill={color} opacity={0.85} />
      <Ellipse cx="32" cy="24" rx="18" ry="3" fill="#fff" opacity={0.4} />
    </>
  ),
  wardrobe: (color) => (
    <>
      <Rect x="12" y="8" width="40" height="48" rx="2" fill={color} />
      <Line x1="32" y1="8" x2="32" y2="56" stroke="#fff" strokeOpacity={0.25} strokeWidth="2" />
      <Circle cx="28" cy="32" r="1.6" fill="#fff" opacity={0.7} />
      <Circle cx="36" cy="32" r="1.6" fill="#fff" opacity={0.7} />
    </>
  ),
  lamp: (color) => (
    <>
      <Path d="M22 12 L42 12 L48 26 L16 26 Z" fill={color} />
      <Rect x="30.5" y="26" width="3" height="24" fill={color} opacity={0.85} />
      <Ellipse cx="32" cy="52" rx="10" ry="3.5" fill={color} />
    </>
  ),
};

export function ProductIllustration({ icon, color = "#D0233A", size = 34 }) {
  const shape = SHAPES[icon] || SHAPES.sofa;
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {shape(color)}
    </Svg>
  );
}

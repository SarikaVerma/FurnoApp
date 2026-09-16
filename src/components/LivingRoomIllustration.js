import React from "react";
import Svg, { Rect, Path, Ellipse, Circle, G } from "react-native-svg";

// Flat-style hero illustration for the Onboarding screen: a potted plant,
// floor lamp, sofa, and armchair. Hand-drawn shapes (not a photo/import),
// since this is a static piece of brand art rather than data-driven
// product art like ProductIllustration.
export function LivingRoomIllustration({ width = 300, height = 190 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 200">
      {/* plant */}
      <G>
        <Path d="M46 150 L38 105 M46 150 L46 98 M46 150 L54 108" stroke="#1F5C4A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <Path d="M38 105 Q30 92 34 78 Q44 88 38 105 Z" fill="#2C7A5E" />
        <Path d="M46 98 Q46 80 38 66 Q54 72 46 98 Z" fill="#1F5C4A" />
        <Path d="M46 98 Q46 78 56 66 Q60 84 46 98 Z" fill="#2C7A5E" />
        <Path d="M54 108 Q64 96 62 82 Q72 96 54 108 Z" fill="#1F5C4A" />
        <Path d="M32 150 L60 150 L56 176 L36 176 Z" fill="#2A7C82" />
        <Rect x="32" y="146" width="28" height="8" rx="2" fill="#3A9399" />
      </G>

      {/* floor lamp */}
      <G>
        <Rect x="85" y="70" width="4" height="98" fill="#1B1420" />
        <Ellipse cx="87" cy="170" rx="14" ry="4" fill="#1B1420" />
        <Path d="M64 70 L110 70 L100 40 L74 40 Z" fill="#E0A23B" />
      </G>

      {/* sofa */}
      <G>
        <Rect x="112" y="118" width="140" height="34" rx="10" fill="#EFE3D3" />
        <Rect x="116" y="92" width="132" height="40" rx="16" fill="#E4D5C0" />
        <Rect x="100" y="106" width="20" height="52" rx="9" fill="#EFE3D3" />
        <Rect x="244" y="106" width="20" height="52" rx="9" fill="#EFE3D3" />
        <Rect x="128" y="104" width="34" height="30" rx="8" fill="#5B8FA8" />
        <Rect x="168" y="104" width="34" height="30" rx="8" fill="#E0A23B" />
        <Rect x="206" y="104" width="30" height="30" rx="8" fill="#5B8FA8" />
        <Rect x="112" y="150" width="8" height="14" rx="2" fill="#3A2E20" />
        <Rect x="244" y="150" width="8" height="14" rx="2" fill="#3A2E20" />
      </G>

      {/* armchair */}
      <G>
        <Path d="M256 168 L256 110 Q256 92 276 92 L296 92 Q312 92 312 110 L312 168 Z" fill="#E0A23B" />
        <Rect x="250" y="128" width="14" height="40" rx="7" fill="#D6952E" />
        <Rect x="304" y="120" width="14" height="48" rx="7" fill="#D6952E" />
        <Rect x="264" y="118" width="38" height="40" rx="8" fill="#FBF6EE" />
        <Circle cx="274" cy="130" r="2.4" fill="#1B1420" />
        <Circle cx="286" cy="130" r="2.4" fill="#1B1420" />
        <Circle cx="298" cy="130" r="2.4" fill="#1B1420" />
        <Circle cx="280" cy="140" r="2.4" fill="#1B1420" />
        <Circle cx="292" cy="140" r="2.4" fill="#1B1420" />
        <Rect x="258" y="168" width="6" height="12" fill="#3A2E20" />
        <Rect x="306" y="168" width="6" height="12" fill="#3A2E20" />
      </G>
    </Svg>
  );
}

import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, PanResponder, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";

// Header gradient wrapper used by every screen (matches the amber -> crimson
// header from the source mockups).
export function GradientHeader({ children, style }) {
  return (
    <LinearGradient
      colors={[colors.gradFrom, colors.gradTo]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
      style={[styles.header, style]}
    >
      {children}
    </LinearGradient>
  );
}

export function PrimaryButton({ label, onPress, style, textStyle }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={[styles.button, style]}>
      {typeof label === "string" ? (
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      ) : (
        label
      )}
    </TouchableOpacity>
  );
}

// Maps a bottom-tab key to the screen it should open. Centralised here so
// every screen that renders <TabBar /> navigates the same way.
const TAB_ROUTES = {
  home: "Home",
  cart: "Cart",
  profile: "Profile",
  settings: "Settings",
};

export function handleTabPress(navigation, key) {
  const routeName = TAB_ROUTES[key];
  if (routeName) {
    navigation.navigate(routeName);
  }
}

// Bottom tab bar shared by the Profile and Catalog screens.
export function TabBar({ active, onNavigate, Icons }) {
  return (
    <View style={styles.tabBar}>
      {Icons.map(({ key, Icon }) => {
        const isActive = active === key;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => onNavigate(key)}
            style={[styles.tabButton, isActive && styles.tabButtonActive]}
          >
            <Icon size={20} color={isActive ? colors.crimson : "#C9BFC5"} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Pure-JS range slider — no native module, so it works in Expo Snack, web,
// and bare RN alike. Drop-in replacement for @react-native-community/slider
// for the single-thumb case used in FiltersScreen.
export function SimpleSlider({
  minimumValue = 0,
  maximumValue = 100,
  value,
  onValueChange,
  style,
}) {
  const [trackWidth, setTrackWidth] = useState(0);
  // Absolute page-X of the track's left edge, captured once per drag.
  // locationX is only reliable at the instant of touch-down — on web,
  // move events are tracked against whatever DOM node the raw mouse
  // event lands on, not the track itself, so locationX goes stale mid
  // drag. gestureState.moveX stays accurate for the whole gesture on
  // every platform, so combined with this offset it gives the correct
  // position throughout the drag instead of just at the start.
  const trackPageX = useRef(0);
  const clamp = (v) => Math.min(maximumValue, Math.max(minimumValue, v));

  const valueFromX = (x) => {
    if (trackWidth <= 0) return value;
    const ratio = Math.min(1, Math.max(0, x / trackWidth));
    return clamp(minimumValue + ratio * (maximumValue - minimumValue));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        trackPageX.current = evt.nativeEvent.pageX - evt.nativeEvent.locationX;
        onValueChange(valueFromX(evt.nativeEvent.locationX));
      },
      onPanResponderMove: (evt, gestureState) => {
        onValueChange(valueFromX(gestureState.moveX - trackPageX.current));
      },
    })
  ).current;

  const ratio = trackWidth > 0 ? (value - minimumValue) / (maximumValue - minimumValue) : 0;
  const thumbLeft = Math.min(1, Math.max(0, ratio)) * trackWidth;

  return (
    <View
      style={[sliderStyles.track, style]}
      onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
      {...panResponder.panHandlers}
    >
      <View style={sliderStyles.trackBg} />
      <View style={[sliderStyles.trackFill, { width: thumbLeft }]} />
      <View style={[sliderStyles.thumb, { left: thumbLeft - 10 }]} />
    </View>
  );
}

const sliderStyles = StyleSheet.create({
  track: { height: 32, justifyContent: "center" },
  trackBg: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
  },
  trackFill: {
    position: "absolute",
    left: 0,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.plum,
  },
  thumb: {
    position: "absolute",
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: colors.gradFrom,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
});

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  button: {
    width: "100%",
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.crimson,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },
  tabBar: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tabButton: {
    padding: 8,
    borderRadius: 12,
  },
  tabButtonActive: {
    backgroundColor: colors.chip,
  },
});

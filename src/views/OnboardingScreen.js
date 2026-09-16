import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";
import { PrimaryButton, CENTERED_CONTENT } from "../components/Shared";
import { LivingRoomIllustration } from "../components/LivingRoomIllustration";

// Deliberately its own two-stop gradient rather than the shared
// colors.gradFrom/gradTo (used by every screen's header) — this is a
// one-off brand moment (rich peach fading to near-white), not the app's
// everyday header treatment.
const HERO_GRADIENT = ["#F6A868", "#FDF1E7"];

// Pure navigation screen — no data, so no ViewModel needed.
export default function OnboardingScreen({ navigation }) {
  return (
    <LinearGradient colors={HERO_GRADIENT} style={styles.fill}>
      <SafeAreaView style={styles.fill}>
        <View style={styles.content}>
          <Text style={styles.brand}>Furno</Text>
          <Text style={styles.subtitle}>Online Furniture Store</Text>
          <View style={styles.iconWrap}>
            <LivingRoomIllustration width={288} height={182} />
          </View>
        </View>
        <View style={styles.footer}>
          {/* Same PrimaryButton component the Login/Signup button uses,
              so this is guaranteed to look identical rather than a
              separately-styled lookalike. */}
          <PrimaryButton label="Get started" onPress={() => navigation.navigate("Login")} />
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text style={styles.link} onPress={() => navigation.navigate("Login")}>Sign in here</Text>
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 32, paddingTop: 32, ...CENTERED_CONTENT },
  brand: { color: colors.ink, fontSize: 56, fontWeight: "800", letterSpacing: -1, lineHeight: 60 },
  subtitle: { color: colors.ink, fontSize: 14, fontWeight: "500", marginTop: 2, opacity: 0.7 },
  iconWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  footer: { paddingHorizontal: 32, paddingBottom: 32, ...CENTERED_CONTENT },
  // Was white-on-gradient before; the new gradient fades to a pale tint
  // right where this sits, so white text would be unreadable there —
  // switched to dark ink to keep this actually legible, everything else
  // about the control (label, action, position) is unchanged.
  footerText: { marginTop: 18, textAlign: "center", fontSize: 13, color: colors.ink, opacity: 0.75 },
  link: { fontWeight: "700", textDecorationLine: "underline" },
});

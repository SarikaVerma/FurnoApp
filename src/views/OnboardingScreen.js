import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Sofa } from "lucide-react-native";
import { colors } from "../theme";

// Pure navigation screen — no data, so no ViewModel needed.
export default function OnboardingScreen({ navigation }) {
  return (
    <LinearGradient colors={[colors.gradFrom, colors.gradTo]} style={styles.fill}>
      <SafeAreaView style={styles.fill}>
        <View style={styles.content}>
          <Text style={styles.title}>Online Furniture{"\n"}Store</Text>
          <View style={styles.iconWrap}>
            <Sofa size={140} strokeWidth={1} color="#fff" />
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cta} activeOpacity={0.9} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.ctaText}>Get started</Text>
          </TouchableOpacity>
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
  content: { flex: 1, paddingHorizontal: 32, paddingTop: 24 },
  title: { color: "#fff", fontSize: 28, fontWeight: "800", lineHeight: 34 },
  iconWrap: { flex: 1, alignItems: "center", justifyContent: "center", opacity: 0.9 },
  footer: { paddingHorizontal: 32, paddingBottom: 32 },
  cta: { backgroundColor: "#fff", borderRadius: 999, paddingVertical: 16, alignItems: "center" },
  ctaText: { color: colors.plum, fontSize: 15, fontWeight: "700" },
  footerText: { marginTop: 18, textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.85)" },
  link: { fontWeight: "700", textDecorationLine: "underline" },
});

import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckCircle2, MapPin, Truck } from "lucide-react-native";
import { PrimaryButton } from "../components/Shared";
import { colors } from "../theme";
import { useOrderConfirmationViewModel } from "../viewmodels/useOrderConfirmationViewModel";

export default function OrderConfirmationScreen({ navigation, route }) {
  const { loading, city, total, deliveryDate } = useOrderConfirmationViewModel({
    total: route.params?.total,
    eta: route.params?.eta,
  });

  // Pops back to the existing Home instance already in the stack (rather
  // than pushing a new one), so Cart/Payment/this screen are all cleared
  // off the back stack. Home re-checks the real cart on focus, so it picks
  // up the now-empty cart cleared at checkout time.
  const handleExit = () => navigation.navigate("Home");

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <CheckCircle2 size={72} color={colors.crimson} strokeWidth={1.5} />
        </View>
        <Text style={styles.title}>Payment done</Text>
        <Text style={styles.subtitle}>Your order has been placed{total ? ` — $${total.toFixed(2)}` : ""}.</Text>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 24 }} color={colors.crimson} />
        ) : (
          <View style={styles.card}>
            <View style={styles.row}>
              <MapPin size={18} color={colors.plum} strokeWidth={1.8} />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>Delivering to</Text>
                <Text style={styles.rowValue}>{city || "your saved address"}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Truck size={18} color={colors.plum} strokeWidth={1.8} />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>Estimated delivery</Text>
                <Text style={styles.rowValue}>{deliveryDate || "Within 5 business days"}</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <PrimaryButton label="Exit" onPress={handleExit} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 64, alignItems: "center" },
  iconWrap: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "800", color: colors.ink, marginBottom: 8 },
  subtitle: { fontSize: 14, color: colors.muted, textAlign: "center", marginBottom: 8 },
  card: {
    width: "100%",
    marginTop: 28,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    padding: 18,
    gap: 18,
  },
  row: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  rowLabel: { fontSize: 12, color: colors.muted, marginBottom: 2 },
  rowValue: { fontSize: 14, fontWeight: "700", color: colors.ink },
  footer: { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 12 },
});

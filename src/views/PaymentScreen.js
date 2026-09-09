import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, CreditCard } from "lucide-react-native";
import { PrimaryButton } from "../components/Shared";
import { colors } from "../theme";
import { usePaymentViewModel } from "../viewmodels/usePaymentViewModel";

export default function PaymentScreen({ navigation }) {
  const {
    cardholder, setCardholder, cardNumber, setCardNumber,
    month, setMonth, year, setYear, saving, error, addCard,
  } = usePaymentViewModel();

  const handleSubmit = async () => {
    const ok = await addCard();
    if (ok) navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color={colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account/Payment</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView style={[styles.content, { minHeight: 0 }]} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <View style={{ flex: 1 }} />
            <View style={styles.cardBadge}><Text style={styles.cardBadgeText}>CARD</Text></View>
          </View>
          <Text style={styles.cardNumber}>{cardNumber}</Text>
          <View style={styles.cardBottomRow}>
            <Text style={styles.cardMetaLabel}>{cardholder || "Your Name"}</Text>
            <Text style={styles.cardMetaLabel}>{month || "MM"}/{year || "YY"}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Add new card</Text>
        <Text style={styles.label}>Cardholder name</Text>
        <TextInput value={cardholder} onChangeText={setCardholder} placeholder="Your Name" placeholderTextColor={colors.muted} style={styles.input} />

        <Text style={styles.label}>Card number</Text>
        <TextInput value={cardNumber} onChangeText={setCardNumber} keyboardType="number-pad" style={styles.input} />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={styles.label}>Date</Text>
            <TextInput value={month} onChangeText={setMonth} placeholder="MM" placeholderTextColor={colors.muted} style={styles.input} keyboardType="number-pad" maxLength={2} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Year</Text>
            <TextInput value={year} onChangeText={setYear} placeholder="YY" placeholderTextColor={colors.muted} style={styles.input} keyboardType="number-pad" maxLength={2} />
          </View>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          label={
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <CreditCard size={16} color="#fff" />
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
                {saving ? "Adding…" : "Add now"}
              </Text>
            </View>
          }
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  headerTitle: { fontSize: 15, fontWeight: "700", color: colors.ink },
  content: { flex: 1, paddingHorizontal: 24 },
  card: { borderRadius: 18, padding: 18, marginTop: 8, marginBottom: 24, backgroundColor: colors.gradFrom },
  cardTopRow: { flexDirection: "row", marginBottom: 20 },
  cardBadge: { backgroundColor: "#fff", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  cardBadgeText: { fontSize: 10, fontWeight: "800", color: colors.plum },
  cardNumber: { color: "#fff", fontSize: 17, fontWeight: "700", letterSpacing: 2, marginBottom: 18 },
  cardBottomRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  cardMetaLabel: { color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: "600" },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: colors.ink, marginBottom: 14 },
  label: { fontSize: 12, fontWeight: "500", color: colors.muted, marginBottom: 4 },
  input: { fontSize: 14, color: colors.ink, borderBottomWidth: 1, borderBottomColor: colors.line, paddingVertical: 8, marginBottom: 18 },
  row: { flexDirection: "row" },
  error: { color: colors.crimson, fontSize: 12, marginBottom: 8 },
  footer: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 24 },
});

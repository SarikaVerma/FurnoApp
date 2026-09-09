import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Smartphone, Landmark, MessageSquareText, Store, Wallet } from "lucide-react-native";
import { PrimaryButton } from "../components/Shared";
import { colors } from "../theme";
import { useWalletViewModel } from "../viewmodels/useWalletViewModel";

const METHOD_ICONS = { mobile: Smartphone, internet: Landmark, sms: MessageSquareText, pawnshop: Store };
const STATIC_METHODS = [
  { key: "mobile", label: "Mobile banking" },
  { key: "internet", label: "Internet banking" },
  { key: "sms", label: "SMS banking" },
  { key: "pawnshop", label: "Pawnshop" },
];

export default function WalletScreen({ navigation }) {
  const { balance, loading, error } = useWalletViewModel();

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color={colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top up Furpay</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Balance</Text>
          {loading ? (
            <ActivityIndicator color={colors.plum} style={{ marginTop: 6 }} />
          ) : (
            <Text style={styles.balanceValue}>${balance.toFixed(2)}</Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Payment method</Text>
        {STATIC_METHODS.map((m) => {
          const Icon = METHOD_ICONS[m.key];
          return (
            <TouchableOpacity key={m.key} style={styles.row}>
              <Icon size={18} color={colors.plum} strokeWidth={1.8} />
              <Text style={styles.rowLabel}>{m.label}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          );
        })}
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          label={
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Wallet size={16} color="#fff" />
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>Top up</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  headerTitle: { fontSize: 15, fontWeight: "700", color: colors.ink },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  balanceCard: { backgroundColor: "#FBF3EF", borderWidth: 1, borderColor: colors.line, borderRadius: 16, paddingHorizontal: 20, paddingVertical: 20, marginBottom: 28 },
  balanceLabel: { fontSize: 12, fontWeight: "500", color: colors.muted },
  balanceValue: { fontSize: 26, fontWeight: "800", color: colors.plum, marginTop: 2 },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: colors.ink, marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.line },
  rowLabel: { flex: 1, fontSize: 14, fontWeight: "500", color: colors.ink },
  chevron: { color: "#C9BFC5", fontSize: 16 },
  error: { color: colors.crimson, fontSize: 12, marginTop: 12 },
  footer: { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 12 },
});

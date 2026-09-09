import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Sofa, Armchair, BedDouble, Minus, Plus, ShoppingCart } from "lucide-react-native";
import { PrimaryButton } from "../components/Shared";
import { colors } from "../theme";
import { useCartViewModel } from "../viewmodels/useCartViewModel";

const ICONS = { sofa: Sofa, armchair: Armchair, bed: BedDouble, chair: Armchair };

export default function CartScreen({ navigation }) {
  const { items, total, loading, error, checkingOut, updateQuantity, removeItem, checkout } =
    useCartViewModel();

  const handleCheckout = async () => {
    const order = await checkout();
    if (order) {
      Alert.alert("Order placed", `Total: $${order.total.toFixed(2)}`, [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color={colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My basket</Text>
        <View style={{ width: 22 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={colors.crimson} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : items.length === 0 ? (
        <Text style={styles.emptyText}>Your basket is empty.</Text>
      ) : (
        <ScrollView
          style={{ flex: 1, minHeight: 0, paddingHorizontal: 20 }}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {items.map((item) => {
            const Icon = ICONS[item.product.icon] || Sofa;
            return (
              <View key={item.cartItemId} style={styles.item}>
                <View style={styles.itemIcon}>
                  <Icon size={22} color={colors.crimson} strokeWidth={1.7} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.product.name}</Text>
                  <Text style={styles.itemPrice}>${item.product.price}</Text>
                </View>
                <View style={styles.stepper}>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    style={styles.stepperBtn}
                  >
                    <Minus size={13} color={colors.muted} />
                  </TouchableOpacity>
                  <Text style={styles.stepperValue}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    style={styles.stepperBtn}
                  >
                    <Plus size={13} color={colors.muted} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => removeItem(item.cartItemId)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <ShoppingCart size={18} color={colors.plum} />
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        <PrimaryButton
          label={checkingOut ? "Placing order…" : "Checkout"}
          onPress={handleCheckout}
          style={items.length === 0 || checkingOut ? { opacity: 0.5 } : undefined}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: { fontSize: 15, fontWeight: "700", color: colors.ink },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  itemIcon: {
    height: 48,
    width: 48,
    borderRadius: 12,
    backgroundColor: colors.chip,
    alignItems: "center",
    justifyContent: "center",
  },
  itemName: { fontSize: 14, fontWeight: "600", color: colors.ink },
  itemPrice: { fontSize: 13, fontWeight: "700", color: colors.plum, marginTop: 2 },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  stepperBtn: { padding: 2 },
  stepperValue: { width: 16, textAlign: "center", fontSize: 12.5, fontWeight: "600" },
  removeText: { fontSize: 11, color: colors.crimson, fontWeight: "600", marginLeft: 8 },
  footer: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24 },
  totalRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 },
  totalLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: colors.ink },
  totalValue: { fontSize: 18, fontWeight: "800", color: colors.plum },
  errorText: { color: colors.crimson, textAlign: "center", marginTop: 24 },
  emptyText: { color: colors.muted, textAlign: "center", marginTop: 40 },
});

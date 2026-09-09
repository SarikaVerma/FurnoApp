import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search,
  Sofa,
  Armchair,
  BedDouble,
  Minus,
  Plus,
  SlidersHorizontal,
  Store,
  ShoppingCart,
  User,
  Settings,
} from "lucide-react-native";
import { GradientHeader, TabBar, handleTabPress } from "../components/Shared";
import { colors } from "../theme";
import { useHomeViewModel } from "../viewmodels/useHomeViewModel";

const ICONS = { sofa: Sofa, armchair: Armchair, bed: BedDouble, chair: Armchair };

// View: renders exactly what the ViewModel gives it. No axios, no data
// shaping, no business logic lives here — that's the ViewModel's job.
export default function HomeScreen({ navigation }) {
  const { products, loading, error, addToCart, reload } = useHomeViewModel();
  const [qty, setQty] = React.useState({});

  const getQty = (id) => qty[id] ?? 1;
  const updateQty = (id, delta) =>
    setQty((q) => ({ ...q, [id]: Math.max(1, getQty(id) + delta) }));

  return (
    <SafeAreaView style={styles.fill}>
      <GradientHeader>
        <View style={styles.searchBar}>
          <Search size={17} color={colors.muted} />
          <Text style={styles.searchPlaceholder}>Search…</Text>
        </View>
      </GradientHeader>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Catalog</Text>
        <TouchableOpacity style={styles.filterLink} onPress={() => navigation.navigate("Filters")}>
          <SlidersHorizontal size={14} color={colors.crimson} />
          <Text style={styles.filterLinkText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={colors.crimson} />
      ) : error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={reload}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1, minHeight: 0, paddingHorizontal: 20 }}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {products.map((item) => {
            const Icon = ICONS[item.icon] || Sofa;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={() => navigation.navigate("ProductDetail", { id: item.id })}
              >
                <View style={styles.itemIcon}>
                  <Icon size={22} color={colors.crimson} strokeWidth={1.7} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {item.wasPrice ? (
                    <Text style={styles.itemWas}>${item.wasPrice}</Text>
                  ) : null}
                </View>
                <View style={styles.stepper}>
                  <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.stepperBtn}>
                    <Minus size={13} color={colors.muted} />
                  </TouchableOpacity>
                  <Text style={styles.stepperValue}>{getQty(item.id)}</Text>
                  <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.stepperBtn}>
                    <Plus size={13} color={colors.muted} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => addToCart(item.id, getQty(item.id))}
                  style={styles.priceButton}
                >
                  <Text style={styles.itemPrice}>${item.price}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      <TabBar
        active="home"
        onNavigate={(key) => handleTabPress(navigation, key)}
        Icons={[
          { key: "home", Icon: Store },
          { key: "cart", Icon: ShoppingCart },
          { key: "profile", Icon: User },
          { key: "settings", Icon: Settings },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#fff" },
  searchBar: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchPlaceholder: { fontSize: 14, color: colors.muted },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: colors.ink },
  filterLink: { flexDirection: "row", alignItems: "center", gap: 4 },
  filterLinkText: { fontSize: 12.5, fontWeight: "600", color: colors.crimson },
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
  itemWas: { fontSize: 11, color: "#C9BFC5", textDecorationLine: "line-through" },
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
  priceButton: { width: 56, alignItems: "flex-end" },
  itemPrice: { fontSize: 14, fontWeight: "700", color: colors.plum },
  errorBox: { padding: 24, alignItems: "center" },
  errorText: { color: colors.crimson, fontSize: 13, marginBottom: 8, textAlign: "center" },
  retryText: { color: colors.plum, fontWeight: "700", fontSize: 13 },
});

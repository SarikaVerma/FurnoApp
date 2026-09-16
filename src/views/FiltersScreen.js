import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, SlidersHorizontal } from "lucide-react-native";
import { GradientHeader, PrimaryButton, SimpleSlider } from "../components/Shared";
import { ProductIllustration } from "../components/ProductIllustration";
import { colors } from "../theme";
import { useFiltersViewModel } from "../viewmodels/useFiltersViewModel";

const SWATCHES = ["#FFFFFF", "#1B1420", "#8A8690", "#5C2A6B", "#F0A63B", "#D0432B", "#8E4FBF", "#3D7FD1", "#3FB6A8", "#8DC63F"];

export default function FiltersScreen({ navigation, route }) {
  const onApply = (filters) => {
    // Home's ViewModel exposes applyFilters — Filters just passes results
    // back through navigation params for Home to pick up on focus, or you
    // can wire a shared context/store here if you prefer.
    navigation.navigate("Home", { filters });
  };

  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    maxPrice,
    setMaxPrice,
    selectedColor,
    setSelectedColor,
    apply,
  } = useFiltersViewModel(onApply);

  return (
    <SafeAreaView style={styles.fill}>
      <GradientHeader style={{ paddingBottom: 16 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filters</Text>
          <SlidersHorizontal size={18} color="#fff" />
        </View>
      </GradientHeader>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.categoryRow}>
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(active ? null : cat.id)}
                style={[styles.categoryChip, active && styles.categoryChipActive]}
              >
                <ProductIllustration icon={cat.icon} color={colors.crimson} size={22} />
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Pricing</Text>
        <SimpleSlider minimumValue={25} maximumValue={505} value={maxPrice} onValueChange={setMaxPrice} style={{ marginTop: 8 }} />
        <View style={styles.rowBetween}>
          <Text style={styles.priceLabel}>${minPrice}</Text>
          <Text style={styles.priceLabel}>${Math.round(maxPrice)}</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Colors</Text>
        <View style={styles.swatchGrid}>
          {SWATCHES.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setSelectedColor(c)}
              style={[
                styles.swatch,
                { backgroundColor: c },
                c === "#FFFFFF" && { borderWidth: 1, borderColor: colors.line },
                selectedColor === c && styles.swatchActive,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton label="Apply filters" onPress={apply} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#fff" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  headerTitle: { color: "#fff", fontSize: 15, fontWeight: "700" },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: colors.ink, marginBottom: 12 },
  categoryRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 28 },
  categoryChip: { height: 56, width: 56, borderRadius: 16, borderWidth: 1, borderColor: colors.line, alignItems: "center", justifyContent: "center" },
  categoryChipActive: { borderColor: colors.crimson, backgroundColor: colors.chip },
  priceLabel: { fontSize: 12, fontWeight: "600", color: colors.ink, marginBottom: 24 },
  swatchGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  swatch: { height: 32, width: 32, borderRadius: 16 },
  swatchActive: { borderWidth: 2, borderColor: colors.plum },
  footer: { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 12 },
});

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Heart, Armchair, Star } from "lucide-react-native";
import { colors } from "../theme";
import { useProductDetailViewModel } from "../viewmodels/useProductDetailViewModel";
import { useReviewsViewModel } from "../viewmodels/useReviewsViewModel";

export default function ProductDetailScreen({ navigation, route }) {
  const productId = route?.params?.id;
  const { product, loading, error, adding, added, addToCart } = useProductDetailViewModel(productId);
  const { reviews } = useReviewsViewModel(productId);
  const [qty, setQty] = useState(1);

  if (loading) {
    return (
      <SafeAreaView style={styles.fill}>
        <ActivityIndicator style={{ marginTop: 60 }} color={colors.crimson} />
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.fill}>
        <Text style={styles.errorText}>{error || "Product not found"}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color={colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> </Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView style={[styles.content, { minHeight: 0 }]} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.imageWrap}>
          <Armchair size={140} color={colors.crimson} strokeWidth={1} />
        </View>

        <View style={styles.titleRow}>
          <View>
            <Text style={styles.label}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>
          <TouchableOpacity
            onPress={() => addToCart(qty)}
            style={styles.buyNow}
            disabled={adding}
          >
            <Text style={styles.buyNowText}>{added ? "Added ✓" : adding ? "Adding…" : "Buy now"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.descRow}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Heart size={20} color={colors.crimson} />
        </View>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Reviews", { productId })}>
          <View style={styles.reviewsRow}>
            <Star size={14} color={colors.gradTo} fill={colors.gradTo} />
            <Text style={styles.reviewsText}>{reviews.length} reviews</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  headerTitle: { fontSize: 15, fontWeight: "700", color: colors.ink },
  content: { flex: 1, paddingHorizontal: 24 },
  imageWrap: { height: 220, borderRadius: 20, backgroundColor: colors.chip, alignItems: "center", justifyContent: "center", marginBottom: 20 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  label: { fontSize: 20, fontWeight: "700", color: colors.ink },
  price: { fontSize: 22, fontWeight: "800", color: colors.plum, marginTop: 2 },
  buyNow: { backgroundColor: colors.crimson, borderRadius: 999, paddingVertical: 12, paddingHorizontal: 22 },
  buyNowText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  descRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: colors.ink },
  description: { fontSize: 13.5, lineHeight: 21, color: colors.muted },
  reviewsRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 20, marginBottom: 24 },
  reviewsText: { fontSize: 13, fontWeight: "600", color: colors.plum },
  errorText: { color: colors.crimson, textAlign: "center", marginTop: 60 },
});

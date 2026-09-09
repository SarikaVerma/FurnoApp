import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Star, User } from "lucide-react-native";
import { colors } from "../theme";
import { useReviewsViewModel } from "../viewmodels/useReviewsViewModel";

function Stars({ rating }) {
  return (
    <View style={{ flexDirection: "row", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={13} color={colors.gradTo} fill={n <= rating ? colors.gradTo : "transparent"} />
      ))}
    </View>
  );
}

export default function ReviewsScreen({ navigation, route }) {
  const productId = route?.params?.productId;
  const { reviews, loading, error } = useReviewsViewModel(productId);

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color={colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={{ width: 22 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={colors.crimson} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : reviews.length === 0 ? (
        <Text style={styles.emptyText}>No reviews yet.</Text>
      ) : (
        <ScrollView style={[styles.content, { minHeight: 0 }]} contentContainerStyle={{ paddingBottom: 24 }}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewRow}>
              <View style={styles.avatar}>
                <User size={18} color={colors.plum} strokeWidth={1.8} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{review.name}</Text>
                  <Stars rating={review.rating} />
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  headerTitle: { fontSize: 15, fontWeight: "700", color: colors.ink },
  content: { flex: 1, paddingHorizontal: 20 },
  reviewRow: { flexDirection: "row", gap: 12, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.line },
  avatar: { height: 36, width: 36, borderRadius: 18, backgroundColor: colors.chip, alignItems: "center", justifyContent: "center" },
  nameRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: 13.5, fontWeight: "700", color: colors.ink },
  reviewText: { fontSize: 12.5, color: colors.muted, lineHeight: 19, marginTop: 4 },
  errorText: { color: colors.crimson, textAlign: "center", marginTop: 40 },
  emptyText: { color: colors.muted, textAlign: "center", marginTop: 40 },
});

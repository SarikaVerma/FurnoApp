import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Mail } from "lucide-react-native";
import { colors } from "../theme";

// No messages feature exists yet in this POC — this screen exists so
// tapping "Messages" from Profile goes somewhere real instead of doing
// nothing, and shows an honest empty state rather than fabricated threads.
export default function MessagesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color={colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.empty}>
        <Mail size={40} color={colors.line} strokeWidth={1.5} />
        <Text style={styles.emptyTitle}>No messages yet</Text>
        <Text style={styles.emptyText}>
          Messages from Furno support and order updates will show up here.
        </Text>
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
  empty: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 40, gap: 10 },
  emptyTitle: { fontSize: 15, fontWeight: "700", color: colors.ink, marginTop: 4 },
  emptyText: { fontSize: 13, color: colors.muted, textAlign: "center", lineHeight: 19 },
});

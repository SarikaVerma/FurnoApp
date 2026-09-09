import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail, Bell, User, ShoppingCart, Settings, Store } from "lucide-react-native";
import { GradientHeader, TabBar, handleTabPress } from "../components/Shared";
import { colors } from "../theme";
import { useProfileViewModel } from "../viewmodels/useProfileViewModel";

const ROWS = [
  { key: "messages", icon: Mail, label: "Messages", badge: 3 },
  { key: "notifications", icon: Bell, label: "Notifications", badge: 9, route: "Notifications" },
  { key: "account", icon: User, label: "Account details" },
  { key: "purchases", icon: ShoppingCart, label: "My purchases", route: "Cart" },
  { key: "settings", icon: Settings, label: "Settings", route: "Settings" },
];

export default function ProfileScreen({ navigation }) {
  const { user, loading, error } = useProfileViewModel();

  return (
    <SafeAreaView style={styles.fill}>
      <GradientHeader style={styles.header}>
        <View style={styles.avatar}>
          <User size={38} color="#fff" strokeWidth={1.6} />
        </View>
        <Text style={styles.name}>{loading ? "…" : user?.name}</Text>
        <Text style={styles.city}>📍 {loading ? "" : user?.city}</Text>
      </GradientHeader>

      <View style={styles.sheet}>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : loading ? (
          <ActivityIndicator color={colors.crimson} style={{ marginTop: 20 }} />
        ) : (
          ROWS.map((row) => {
            const Icon = row.icon;
            return (
              <TouchableOpacity
                key={row.key}
                style={styles.row}
                onPress={() => row.route && navigation.navigate(row.route)}
              >
                <Icon size={19} color={colors.plum} strokeWidth={1.8} />
                <Text style={styles.rowLabel}>{row.label}</Text>
                {row.badge ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{row.badge}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          })
        )}
      </View>

      <TabBar
        active="profile"
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
  header: { alignItems: "center", paddingBottom: 56 },
  avatar: { marginTop: 8, height: 80, width: 80, borderRadius: 40, backgroundColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center", borderWidth: 4, borderColor: "rgba(255,255,255,0.3)" },
  name: { marginTop: 12, color: "#fff", fontSize: 16, fontWeight: "700" },
  city: { color: "rgba(255,255,255,0.85)", fontSize: 12 },
  sheet: { marginTop: -32, flex: 1, borderTopLeftRadius: 28, borderTopRightRadius: 28, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 24 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.line },
  rowLabel: { flex: 1, fontSize: 14.5, fontWeight: "500", color: colors.ink },
  badge: { height: 20, width: 20, borderRadius: 10, backgroundColor: colors.gradTo, alignItems: "center", justifyContent: "center" },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  error: { color: colors.crimson, textAlign: "center", marginTop: 20 },
});

import React from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User, Bell, CreditCard, Moon, Globe, ShieldCheck, HelpCircle, Info,
  LogOut, ChevronRight, Store, ShoppingCart, Settings as SettingsIcon,
} from "lucide-react-native";
import { GradientHeader, TabBar, handleTabPress } from "../components/Shared";
import { colors } from "../theme";
import { useSettingsViewModel } from "../viewmodels/useSettingsViewModel";

const LINK_ROWS = [
  { key: "account", icon: User, label: "Account details", route: "Profile" },
  { key: "notifications", icon: Bell, label: "Notifications", route: "Notifications" },
  { key: "payment", icon: CreditCard, label: "Payment methods", route: "Payment" },
  { key: "language", icon: Globe, label: "Language", route: null },
  { key: "privacy", icon: ShieldCheck, label: "Privacy & security", route: null },
  { key: "help", icon: HelpCircle, label: "Help & support", route: null },
  { key: "about", icon: Info, label: "About Furno", route: null },
];

export default function SettingsScreen({ navigation }) {
  const { darkMode, setDarkMode, logout } = useSettingsViewModel();

  const confirmLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          await logout();
          navigation.reset({ index: 0, routes: [{ name: "Onboarding" }] });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.fill}>
      <GradientHeader><Text style={styles.headerTitle}>Settings</Text></GradientHeader>

      <ScrollView style={[styles.sheet, { minHeight: 0 }]} contentContainerStyle={{ paddingBottom: 24 }}>
        <Text style={styles.sectionLabel}>Account</Text>
        {LINK_ROWS.slice(0, 3).map((row) => {
          const Icon = row.icon;
          return (
            <TouchableOpacity key={row.key} style={styles.row} onPress={() => row.route && navigation.navigate(row.route)}>
              <Icon size={19} color={colors.plum} strokeWidth={1.8} />
              <Text style={styles.rowLabel}>{row.label}</Text>
              <ChevronRight size={16} color="#C9BFC5" />
            </TouchableOpacity>
          );
        })}

        <Text style={styles.sectionLabel}>Preferences</Text>
        <View style={styles.row}>
          <Moon size={19} color={colors.plum} strokeWidth={1.8} />
          <Text style={styles.rowLabel}>Dark mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: colors.line, true: colors.crimson }} thumbColor="#fff" />
        </View>
        {LINK_ROWS.slice(3).map((row) => {
          const Icon = row.icon;
          return (
            <TouchableOpacity key={row.key} style={styles.row} onPress={() => row.route && navigation.navigate(row.route)}>
              <Icon size={19} color={colors.plum} strokeWidth={1.8} />
              <Text style={styles.rowLabel}>{row.label}</Text>
              <ChevronRight size={16} color="#C9BFC5" />
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.logoutRow} onPress={confirmLogout}>
          <LogOut size={19} color={colors.crimson} strokeWidth={1.8} />
          <Text style={styles.logoutLabel}>Log out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Furno v1.0.0</Text>
      </ScrollView>

      <TabBar
        active="settings"
        onNavigate={(key) => handleTabPress(navigation, key)}
        Icons={[
          { key: "home", Icon: Store },
          { key: "cart", Icon: ShoppingCart },
          { key: "profile", Icon: User },
          { key: "settings", Icon: SettingsIcon },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#fff" },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "800", marginTop: 6 },
  sheet: { marginTop: -20, flex: 1, borderTopLeftRadius: 28, borderTopRightRadius: 28, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 20 },
  sectionLabel: { fontSize: 11, fontWeight: "700", color: colors.muted, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 18, marginBottom: 6 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.line },
  rowLabel: { flex: 1, fontSize: 14.5, fontWeight: "500", color: colors.ink },
  logoutRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 16, marginTop: 20 },
  logoutLabel: { fontSize: 14.5, fontWeight: "700", color: colors.crimson },
  version: { textAlign: "center", fontSize: 11, color: colors.muted, marginTop: 8, marginBottom: 24 },
});

import React from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { PrimaryButton } from "../components/Shared";
import { colors } from "../theme";
import { useNotificationsViewModel } from "../viewmodels/useNotificationsViewModel";

export default function NotificationsScreen({ navigation }) {
  const { settings, values, loading, saving, error, toggle, save } = useNotificationsViewModel();

  const handleSave = async () => {
    const ok = await save();
    if (ok) navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color={colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 22 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={colors.crimson} />
      ) : (
        <ScrollView style={[styles.content, { minHeight: 0 }]} contentContainerStyle={{ paddingBottom: 24 }}>
          {settings.map((setting) => (
            <View key={setting.key} style={styles.row}>
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={styles.rowLabel}>{setting.label}</Text>
                <Text style={styles.rowDescription}>{setting.description}</Text>
              </View>
              <Switch
                value={!!values[setting.key]}
                onValueChange={() => toggle(setting.key)}
                trackColor={{ false: colors.line, true: colors.crimson }}
                thumbColor="#fff"
              />
            </View>
          ))}
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <PrimaryButton label={saving ? "Saving…" : "Update Settings"} onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  headerTitle: { fontSize: 15, fontWeight: "700", color: colors.ink },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 8 },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.line },
  rowLabel: { fontSize: 14.5, fontWeight: "600", color: colors.ink },
  rowDescription: { fontSize: 12, color: colors.muted, marginTop: 3 },
  footer: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24 },
  error: { color: colors.crimson, fontSize: 12, marginTop: 12 },
});

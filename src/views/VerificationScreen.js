import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail } from "lucide-react-native";
import { PrimaryButton } from "../components/Shared";
import { colors } from "../theme";
import { useVerificationViewModel } from "../viewmodels/useVerificationViewModel";

export default function VerificationScreen({ navigation }) {
  const { digits, setDigit, submitting, error, verify } = useVerificationViewModel();
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    setDigit(value, index);
    if (value && index < 3) inputs.current[index + 1]?.focus();
  };

  const handleSubmit = async () => {
    const ok = await verify();
    if (ok) navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Verification</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Mail size={54} color={colors.crimson} strokeWidth={1.4} />
        </View>
        <Text style={styles.title}>Verification Code</Text>
        <View style={styles.digitsRow}>
          {digits.map((d, i) => (
            <TextInput
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              value={d}
              onChangeText={(v) => handleChange(v, i)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.digitBox}
            />
          ))}
        </View>
        <Text style={styles.helper}>Check the SMS</Text>
        <Text style={styles.helperSub}>message to get a verification code</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={{ marginTop: 32, width: "100%" }}>
          <PrimaryButton label={submitting ? "Verifying…" : "Continue"} onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#fff" },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  headerTitle: { fontSize: 15, fontWeight: "700", color: colors.ink },
  content: { flex: 1, alignItems: "center", paddingHorizontal: 32, paddingTop: 24 },
  iconWrap: { height: 100, width: 100, borderRadius: 50, backgroundColor: colors.chip, alignItems: "center", justifyContent: "center", marginBottom: 20 },
  title: { fontSize: 16, fontWeight: "700", color: colors.ink, marginBottom: 24 },
  digitsRow: { flexDirection: "row", gap: 14, marginBottom: 24 },
  digitBox: { height: 52, width: 44, borderRadius: 10, borderWidth: 1, borderColor: colors.line, textAlign: "center", fontSize: 20, fontWeight: "700", color: colors.ink },
  helper: { fontSize: 13, fontWeight: "600", color: colors.ink },
  helperSub: { fontSize: 12, color: colors.muted, marginTop: 2 },
  error: { color: colors.crimson, fontSize: 12, marginTop: 12 },
});

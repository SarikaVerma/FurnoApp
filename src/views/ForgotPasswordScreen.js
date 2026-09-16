import React, { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, KeyRound } from "lucide-react-native";
import { PrimaryButton, CENTERED_CONTENT } from "../components/Shared";
import { colors } from "../theme";
import { useForgotPasswordViewModel } from "../viewmodels/useForgotPasswordViewModel";

export default function ForgotPasswordScreen({ navigation }) {
  const {
    step,
    email, setEmail,
    digits, setDigit,
    newPassword, setNewPassword,
    fieldError, error, submitting, demoCode,
    requestCode, resetPassword,
  } = useForgotPasswordViewModel();
  const inputs = useRef([]);

  const handleDigitChange = (value, index) => {
    setDigit(value, index);
    if (value && index < 3) inputs.current[index + 1]?.focus();
  };

  const handleReset = async () => {
    const ok = await resetPassword();
    if (ok) navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color={colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset password</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <KeyRound size={44} color={colors.crimson} strokeWidth={1.4} />
        </View>

        {step === "request" ? (
          <>
            <Text style={styles.title}>Forgot your password?</Text>
            <Text style={styles.subtitle}>Enter your account email and we'll send you a reset code.</Text>

            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="you@example.com"
                placeholderTextColor={colors.muted}
              />
              {fieldError ? <Text style={styles.fieldError}>{fieldError}</Text> : null}
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={{ marginTop: 16, width: "100%" }}>
              <PrimaryButton label={submitting ? "Sending…" : "Send reset code"} onPress={requestCode} />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.title}>Check your email</Text>
            <Text style={styles.subtitle}>Enter the 4-digit code and choose a new password.</Text>

            <View style={styles.digitsRow}>
              {digits.map((d, i) => (
                <TextInput
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  value={d}
                  onChangeText={(v) => handleDigitChange(v, i)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={styles.digitBox}
                />
              ))}
            </View>
            {demoCode ? (
              <Text style={styles.demoHint}>No real email server in this demo — your code is {demoCode}</Text>
            ) : null}

            <View style={styles.field}>
              <Text style={styles.label}>New password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="At least 8 characters, 1 letter + 1 number"
                placeholderTextColor={colors.muted}
              />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={{ marginTop: 16, width: "100%" }}>
              <PrimaryButton label={submitting ? "Resetting…" : "Reset password"} onPress={handleReset} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8, ...CENTERED_CONTENT },
  headerTitle: { fontSize: 15, fontWeight: "700", color: colors.ink },
  content: { flex: 1, alignItems: "center", paddingHorizontal: 32, paddingTop: 16, ...CENTERED_CONTENT },
  iconWrap: { height: 88, width: 88, borderRadius: 44, backgroundColor: colors.chip, alignItems: "center", justifyContent: "center", marginBottom: 20 },
  title: { fontSize: 18, fontWeight: "700", color: colors.ink, textAlign: "center" },
  subtitle: { fontSize: 13, color: colors.muted, textAlign: "center", marginTop: 6, marginBottom: 24 },
  field: { width: "100%" },
  label: { fontSize: 12, fontWeight: "500", color: colors.muted, marginBottom: 4 },
  input: {
    fontSize: 15,
    color: colors.ink,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    paddingVertical: 8,
    marginBottom: 6,
    width: "100%",
  },
  fieldError: { color: colors.crimson, fontSize: 11.5 },
  error: { color: colors.crimson, fontSize: 12.5, marginTop: 12, textAlign: "center" },
  digitsRow: { flexDirection: "row", gap: 14, marginBottom: 12 },
  digitBox: { height: 52, width: 44, borderRadius: 10, borderWidth: 1, borderColor: colors.line, textAlign: "center", fontSize: 20, fontWeight: "700", color: colors.ink },
  demoHint: { fontSize: 11.5, color: colors.muted, marginBottom: 24, textAlign: "center" },
});

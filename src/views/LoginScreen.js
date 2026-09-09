import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GradientHeader, PrimaryButton } from "../components/Shared";
import { colors } from "../theme";
import { useLoginViewModel } from "../viewmodels/useLoginViewModel";

export default function LoginScreen({ navigation }) {
  const {
    mode, setMode,
    phone, setPhone,
    password, setPassword,
    name, setName,
    fieldErrors, error, submitting,
    submit,
  } = useLoginViewModel();

  const handleSubmit = async () => {
    const ok = await submit();
    if (!ok) return;
    // Signup goes through OTP verification first; login goes straight in.
    navigation.navigate(mode === "signup" ? "Verification" : "Profile");
  };

  return (
    <SafeAreaView style={styles.fill}>
      <GradientHeader style={{ paddingBottom: 40 }} />
      <View style={styles.sheet}>
        <View style={styles.toggle}>
          {["login", "signup"].map((m) => {
            const isActive = mode === m;
            return (
              <TouchableOpacity
                key={m}
                onPress={() => setMode(m)}
                style={[styles.toggleBtn, isActive && styles.toggleBtnActive]}
              >
                <Text style={[styles.toggleText, isActive && styles.toggleTextActive]}>
                  {m === "login" ? "Log in" : "Sign up"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {mode === "signup" ? (
          <>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
              placeholderTextColor={colors.muted}
            />
          </>
        ) : null}

        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        {fieldErrors.phone ? <Text style={styles.fieldError}>{fieldErrors.phone}</Text> : null}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="At least 8 characters, 1 letter + 1 number"
          placeholderTextColor={colors.muted}
        />
        {fieldErrors.password ? <Text style={styles.fieldError}>{fieldErrors.password}</Text> : null}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={{ marginTop: 24, marginBottom: 20 }}>
          <PrimaryButton
            label={submitting ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
            onPress={handleSubmit}
          />
        </View>
        <Text style={styles.forgot}>Forgot your password?</Text>

        {mode === "login" ? (
          <Text style={styles.hint}>
            Demo account — phone: +0 (000) 000-00-00, password: Passw0rd1
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#fff" },
  sheet: {
    marginTop: -24,
    flex: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  toggle: {
    flexDirection: "row",
    backgroundColor: "#F4EEEC",
    borderRadius: 999,
    padding: 4,
    marginBottom: 24,
  },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: 999, alignItems: "center" },
  toggleBtnActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  toggleText: { fontSize: 14, fontWeight: "600", color: colors.muted },
  toggleTextActive: { color: colors.plum },
  label: { fontSize: 12, fontWeight: "500", color: colors.muted, marginBottom: 4 },
  input: {
    fontSize: 15,
    color: colors.ink,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    paddingVertical: 8,
    marginBottom: 6,
  },
  fieldError: { color: colors.crimson, fontSize: 11.5, marginBottom: 14 },
  error: { color: colors.crimson, fontSize: 12.5, marginTop: 4, textAlign: "center" },
  forgot: { textAlign: "center", fontSize: 13, fontWeight: "600", color: colors.plum },
  hint: { textAlign: "center", fontSize: 11, color: colors.muted, marginTop: 16 },
});

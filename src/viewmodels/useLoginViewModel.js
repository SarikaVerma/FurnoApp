import { useState } from "react";
import { authService } from "../services/authService";
import { validateCredentials } from "../utils/validators";

export function useLoginViewModel() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [phone, setPhone] = useState("+0 (000) 000-00-00");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ phone: null, password: null });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setError(null);

    // Regex validation runs first, entirely client-side, before any call
    // to the auth service — bad formats never hit "business logic".
    const errors = validateCredentials(phone, password);
    setFieldErrors(errors);
    if (errors.phone || errors.password) {
      return false;
    }

    setSubmitting(true);
    try {
      if (mode === "login") {
        await authService.login(phone, password);
      } else {
        await authService.register(phone, password, name || "New User", city);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    mode,
    setMode,
    phone,
    setPhone,
    password,
    setPassword,
    name,
    setName,
    city,
    setCity,
    fieldErrors,
    error,
    submitting,
    submit,
  };
}

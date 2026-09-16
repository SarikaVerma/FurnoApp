import { useState } from "react";
import { authService } from "../services/authService";
import { validateCredentials } from "../utils/validators";

export function useLoginViewModel() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("demo@furno.app");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: null, password: null });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setError(null);

    // Regex validation runs first, entirely client-side, before any call
    // to the auth service — bad formats never hit "business logic".
    const errors = validateCredentials(email, password);
    setFieldErrors(errors);
    if (errors.email || errors.password) {
      return false;
    }

    setSubmitting(true);
    try {
      if (mode === "login") {
        await authService.login(email, password);
      } else {
        await authService.register(email, password, name || "New User", city);
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
    email,
    setEmail,
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

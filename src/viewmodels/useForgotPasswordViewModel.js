import { useState } from "react";
import { authService } from "../services/authService";
import { isValidEmail, isValidPassword } from "../utils/validators";

export function useForgotPasswordViewModel() {
  const [step, setStep] = useState("request"); // "request" | "reset"
  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [fieldError, setFieldError] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  // No real email server exists in this POC, so the code that would have
  // been emailed is surfaced here instead — same pattern as Verification.
  const [demoCode, setDemoCode] = useState(null);

  const setDigit = (value, index) => {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value.slice(-1);
      return next;
    });
  };

  const requestCode = async () => {
    setError(null);
    if (!isValidEmail(email)) {
      setFieldError("Enter a valid email address.");
      return false;
    }
    setFieldError(null);
    setSubmitting(true);
    try {
      await authService.requestPasswordReset(email);
      const pending = await authService.getPendingReset();
      setDemoCode(pending?.code ?? null);
      setStep("reset");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const resetPassword = async () => {
    setError(null);
    const code = digits.join("");
    if (code.length !== 4) {
      setError("Enter all 4 digits.");
      return false;
    }
    if (!isValidPassword(newPassword)) {
      setError("Password must be at least 8 characters and include a letter and a number.");
      return false;
    }
    setSubmitting(true);
    try {
      await authService.resetPassword(code, newPassword);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    step,
    email,
    setEmail,
    digits,
    setDigit,
    newPassword,
    setNewPassword,
    fieldError,
    error,
    submitting,
    demoCode,
    requestCode,
    resetPassword,
  };
}

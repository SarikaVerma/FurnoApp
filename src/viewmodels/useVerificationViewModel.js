import { useEffect, useState } from "react";
import { authService } from "../services/authService";

export function useVerificationViewModel() {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  // No real email server exists in this POC, so the code that would have
  // been emailed is surfaced here instead of silently accepting any input.
  const [demoCode, setDemoCode] = useState(null);

  useEffect(() => {
    authService.getPendingVerification().then((pending) => {
      setDemoCode(pending?.code ?? null);
    });
  }, []);

  const setDigit = (value, index) => {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value.slice(-1);
      return next;
    });
  };

  const verify = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const code = digits.join("");
      if (code.length !== 4) {
        setError("Enter all 4 digits.");
        return false;
      }
      await authService.verifyCode(code);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { digits, setDigit, submitting, error, verify, demoCode };
}

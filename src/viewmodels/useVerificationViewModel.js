import { useState } from "react";

export function useVerificationViewModel() {
  const [digits, setDigits] = useState(["0", "5", "5", "8"]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
      await new Promise((resolve) => setTimeout(resolve, 400));
      return code.length === 4;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { digits, setDigit, submitting, error, verify };
}

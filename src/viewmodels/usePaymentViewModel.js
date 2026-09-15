import { useState } from "react";

export function usePaymentViewModel() {
  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumberRaw] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Keeps only digits (max 16) and re-inserts a space every 4, like a real
  // card entry field — typing/pasting anything else can't sneak through.
  const setCardNumber = (text) => {
    const digits = text.replace(/\D/g, "").slice(0, 16);
    setCardNumberRaw(digits.replace(/(.{4})/g, "$1 ").trim());
  };

  const addCard = async () => {
    const digits = cardNumber.replace(/\s/g, "");
    const isAllZeros = /^0+$/.test(digits);
    if (!cardholder || digits.length < 16 || isAllZeros) {
      setError(
        isAllZeros
          ? "Enter a real card number — all zeros isn't valid."
          : "Enter a valid cardholder name and 16-digit card number."
      );
      return false;
    }
    setSaving(true);
    setError(null);
    try {
      // No /api/payment-methods endpoint yet — simulate the round trip.
      await new Promise((resolve) => setTimeout(resolve, 500));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    cardholder,
    setCardholder,
    cardNumber,
    setCardNumber,
    month,
    setMonth,
    year,
    setYear,
    saving,
    error,
    addCard,
  };
}

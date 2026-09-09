import { useState } from "react";

export function usePaymentViewModel() {
  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumber] = useState("0000 0000 0000 0000");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const addCard = async () => {
    if (!cardholder || cardNumber.replace(/\s/g, "").length < 16) {
      setError("Enter a valid cardholder name and 16-digit card number.");
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

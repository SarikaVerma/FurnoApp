import { useEffect, useState } from "react";
import { userService } from "../services/userService";

function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function useOrderConfirmationViewModel({ total, eta }) {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    userService.getCurrentUser().then((user) => {
      if (!cancelled) {
        setCity(user.city);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    loading,
    city,
    total,
    deliveryDate: formatDate(eta),
  };
}

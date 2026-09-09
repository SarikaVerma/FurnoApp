import { useCallback, useEffect, useState } from "react";
import { userService } from "../services/userService";

export function useWalletViewModel() {
  const [balance, setBalance] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const user = await userService.getCurrentUser();
      setBalance(user.furpayBalance ?? 0);
      setPaymentMethods(user.paymentMethods ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { balance, paymentMethods, loading, error, reload: load };
}

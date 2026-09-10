import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { userService } from "../services/userService";
import { User } from "../models/User";

export function useProfileViewModel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await userService.getCurrentUser();
      setUser(User(raw));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reload on focus, not just on mount — the stack navigator reuses this
  // screen instance rather than remounting it, so returning here after
  // changing notification settings would otherwise still show stale data
  // (e.g. the notifications badge count).
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return { user, loading, error, reload: load };
}

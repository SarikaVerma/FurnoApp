import { useCallback, useEffect, useState } from "react";
import { userService } from "../services/userService";

const DEFAULT_LABELS = [
  { key: "productUpdates", label: "Product updates", description: "Stay life free the freedom of your home" },
  { key: "comments", label: "Comments", description: "Advertising relationships vs business" },
  { key: "offerUpdates", label: "Offer updates", description: "A right media mix can make" },
  { key: "notifications", label: "Notifications", description: "Creating remarkable poster prints" },
];

export function useNotificationsViewModel() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const user = await userService.getCurrentUser();
      setValues(user.notifications || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = (key) => setValues((v) => ({ ...v, [key]: !v[key] }));

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await userService.updateNotificationSettings(values);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { settings: DEFAULT_LABELS, values, loading, saving, error, toggle, save };
}

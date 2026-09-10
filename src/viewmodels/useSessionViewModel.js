import { useEffect, useState } from "react";
import { authService } from "../services/authService";

// Checked once at app startup so a returning, already-logged-in user lands
// on Home instead of being sent through Onboarding/Login again.
export function useSessionViewModel() {
  const [checking, setChecking] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Onboarding");

  useEffect(() => {
    let cancelled = false;
    authService.getSession().then((session) => {
      if (cancelled) return;
      setInitialRoute(session ? "Home" : "Onboarding");
      setChecking(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { checking, initialRoute };
}

import { useState } from "react";
import { authService } from "../services/authService";
import { useCartCount } from "./useCartCount";

export function useSettingsViewModel() {
  const [darkMode, setDarkMode] = useState(false);
  const cartCount = useCartCount();

  const logout = async () => {
    await authService.logout();
    return true;
  };

  return { darkMode, setDarkMode, logout, cartCount };
}

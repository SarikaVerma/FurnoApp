import { useState } from "react";
import { authService } from "../services/authService";

export function useSettingsViewModel() {
  const [darkMode, setDarkMode] = useState(false);

  const logout = async () => {
    await authService.logout();
    return true;
  };

  return { darkMode, setDarkMode, logout };
}

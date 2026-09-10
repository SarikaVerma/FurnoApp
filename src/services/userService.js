import { DATA_BASE_URL } from "./config";
import { authService } from "./authService";

// getCurrentUser fetches the hosted mock profile (avatar, balance, payment
// methods, notification defaults — fields that have no real signup flow),
// then overlays the actual logged-in session's identity fields (name,
// phone, city) on top. Without this overlay, the profile always showed
// the static mock name/city regardless of what someone actually signed
// up with.
export const userService = {
  async getCurrentUser() {
    const res = await fetch(`${DATA_BASE_URL}/user.json`);
    if (!res.ok) throw new Error("Failed to load user");
    const base = await res.json();
    const session = await authService.getSession();
    if (!session) return base;
    return {
      ...base,
      name: session.name || base.name,
      phone: session.phone || base.phone,
      city: session.city || base.city,
    };
  },

  async updateNotificationSettings(settings) {
    const userData = await this.getCurrentUser();
    return { ...userData, notifications: settings };
  },
};

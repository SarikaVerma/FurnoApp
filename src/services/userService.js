import { DATA_BASE_URL } from "./config";

// getCurrentUser fetches the hosted mock user profile over HTTPS.
// updateNotificationSettings has no real backend to write to — it stays
// a mock echo, matching this POC's read-only-API scope.
export const userService = {
  async getCurrentUser() {
    const res = await fetch(`${DATA_BASE_URL}/user.json`);
    if (!res.ok) throw new Error("Failed to load user");
    return res.json();
  },

  async updateNotificationSettings(settings) {
    const userData = await this.getCurrentUser();
    return { ...userData, notifications: settings };
  },
};

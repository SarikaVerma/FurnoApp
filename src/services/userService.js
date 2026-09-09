import userData from "../data/user.json";

// No /api/user endpoint exists on the backend yet — this reads the local
// mock so the ViewModel/View layers already have a real service contract
// to call. Swap the body for an apiClient.get("/user") call once the
// backend route exists; nothing above this file needs to change.
export const userService = {
  async getCurrentUser() {
    return new Promise((resolve) => setTimeout(() => resolve(userData), 200));
  },

  async updateNotificationSettings(settings) {
    // Mock write — just echoes back what was sent, as a real PATCH would.
    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...userData, notifications: settings }), 200)
    );
  },
};

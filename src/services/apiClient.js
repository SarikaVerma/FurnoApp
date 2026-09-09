import axios from "axios";

// Point this at your backend. For a physical device, "localhost" won't
// resolve to your computer — use your machine's LAN IP instead
// (e.g. http://192.168.1.42:4000/api).
const BASE_URL = "http://localhost:4000/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Central place to normalize errors so ViewModels don't each need their
// own try/catch shape-guessing.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || error.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

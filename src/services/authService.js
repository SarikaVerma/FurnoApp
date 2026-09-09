import { normalizePhone } from "../utils/validators";

// Fully offline — same pattern as cartService/ordersService: an in-memory
// store that lives for the app session. Seeded with one demo account so the
// login screen's pre-filled placeholder value works out of the box without
// needing to sign up first.
//
// Regex format validation happens in the ViewModel (via validators.js)
// before these functions are ever called — this service only checks
// business rules: does the phone exist, does the password match, is the
// phone already taken.

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let users = [
  {
    id: "u_demo",
    phone: normalizePhone("+0 (000) 000-00-00"),
    password: "Passw0rd1",
    name: "Your Name",
  },
];

let currentSession = null;

export const authService = {
  async login(phone, password) {
    await delay();
    const normalized = normalizePhone(phone);
    const user = users.find((u) => u.phone === normalized);

    if (!user || user.password !== password) {
      throw new Error("Incorrect phone number or password.");
    }

    currentSession = { id: user.id, phone: user.phone, name: user.name };
    return currentSession;
  },

  async register(phone, password, name = "New User") {
    await delay();
    const normalized = normalizePhone(phone);

    if (users.some((u) => u.phone === normalized)) {
      throw new Error("An account with this phone number already exists.");
    }

    const user = { id: `u_${Date.now()}`, phone: normalized, password, name };
    users.push(user);
    currentSession = { id: user.id, phone: user.phone, name: user.name };
    return currentSession;
  },

  async logout() {
    await delay(100);
    currentSession = null;
  },

  async getSession() {
    return currentSession;
  },
};

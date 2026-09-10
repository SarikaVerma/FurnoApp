import AsyncStorage from "@react-native-async-storage/async-storage";
import { normalizePhone } from "../utils/validators";

// Same in-memory-during-session pattern as cartService/ordersService, but
// the user list and current session are also mirrored to AsyncStorage
// (localStorage on web) so a page reload doesn't wipe out an account you
// just signed up with, or sign you out.
//
// Regex format validation happens in the ViewModel (via validators.js)
// before these functions are ever called — this service only checks
// business rules: does the phone exist, does the password match, is the
// phone already taken.

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const USERS_KEY = "furno.users";
const SESSION_KEY = "furno.session";

function seedUsers() {
  return [
    {
      id: "u_demo",
      phone: normalizePhone("+0 (000) 000-00-00"),
      password: "Passw0rd1",
      name: "Your Name",
      city: "City",
    },
  ];
}

let users = null;
let currentSession = null;
let hydrated = null;

// Loads persisted users/session into memory exactly once. Every exported
// method awaits this first so callers never race the initial storage read.
function hydrate() {
  if (!hydrated) {
    hydrated = (async () => {
      try {
        const stored = await AsyncStorage.getItem(USERS_KEY);
        users = stored ? JSON.parse(stored) : seedUsers();
      } catch {
        users = seedUsers();
      }
      try {
        const stored = await AsyncStorage.getItem(SESSION_KEY);
        currentSession = stored ? JSON.parse(stored) : null;
      } catch {
        currentSession = null;
      }
    })();
  }
  return hydrated;
}

async function persistUsers() {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

async function persistSession() {
  if (currentSession) {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(currentSession));
  } else {
    await AsyncStorage.removeItem(SESSION_KEY);
  }
}

export const authService = {
  async login(phone, password) {
    await hydrate();
    await delay();
    const normalized = normalizePhone(phone);
    const user = users.find((u) => u.phone === normalized);

    if (!user || user.password !== password) {
      throw new Error("Incorrect phone number or password.");
    }

    currentSession = { id: user.id, phone: user.phone, name: user.name, city: user.city };
    await persistSession();
    return currentSession;
  },

  async register(phone, password, name = "New User", city = "") {
    await hydrate();
    await delay();
    const normalized = normalizePhone(phone);

    if (users.some((u) => u.phone === normalized)) {
      throw new Error("An account with this phone number already exists.");
    }

    const user = { id: `u_${Date.now()}`, phone: normalized, password, name, city };
    users.push(user);
    await persistUsers();
    currentSession = { id: user.id, phone: user.phone, name: user.name, city: user.city };
    await persistSession();
    return currentSession;
  },

  async logout() {
    await hydrate();
    await delay(100);
    currentSession = null;
    await persistSession();
  },

  async getSession() {
    await hydrate();
    return currentSession;
  },
};

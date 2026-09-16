import AsyncStorage from "@react-native-async-storage/async-storage";
import { normalizeEmail } from "../utils/validators";

// Same in-memory-during-session pattern as cartService/ordersService, but
// the user list, current session, and any pending email-verification code
// are also mirrored to AsyncStorage (localStorage on web) so a page reload
// doesn't wipe out an account you just signed up with, or sign you out.
//
// Regex format validation happens in the ViewModel (via validators.js)
// before these functions are ever called — this service only checks
// business rules: does the email exist, does the password match, is the
// email already taken.

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const USERS_KEY = "furno.users";
const SESSION_KEY = "furno.session";
const PENDING_KEY = "furno.pendingVerification";
const PENDING_RESET_KEY = "furno.pendingReset";

function seedUsers() {
  return [
    {
      id: "u_demo",
      email: normalizeEmail("demo@furno.app"),
      password: "Passw0rd1",
      name: "Your Name",
      city: "City",
    },
  ];
}

function genCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

let users = null;
let currentSession = null;
let pendingVerification = null; // { email, code } | null
let pendingReset = null; // { email, code } | null
let hydrated = null;

// Loads persisted users/session/pending-code into memory exactly once.
// Every exported method awaits this first so callers never race the
// initial storage read.
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
      try {
        const stored = await AsyncStorage.getItem(PENDING_KEY);
        pendingVerification = stored ? JSON.parse(stored) : null;
      } catch {
        pendingVerification = null;
      }
      try {
        const stored = await AsyncStorage.getItem(PENDING_RESET_KEY);
        pendingReset = stored ? JSON.parse(stored) : null;
      } catch {
        pendingReset = null;
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

async function persistPending() {
  if (pendingVerification) {
    await AsyncStorage.setItem(PENDING_KEY, JSON.stringify(pendingVerification));
  } else {
    await AsyncStorage.removeItem(PENDING_KEY);
  }
}

async function persistPendingReset() {
  if (pendingReset) {
    await AsyncStorage.setItem(PENDING_RESET_KEY, JSON.stringify(pendingReset));
  } else {
    await AsyncStorage.removeItem(PENDING_RESET_KEY);
  }
}

export const authService = {
  async login(email, password) {
    await hydrate();
    await delay();
    const normalized = normalizeEmail(email);
    const user = users.find((u) => u.email === normalized);

    if (!user || user.password !== password) {
      throw new Error("Incorrect email or password.");
    }

    currentSession = { id: user.id, email: user.email, name: user.name, city: user.city };
    await persistSession();
    return currentSession;
  },

  async register(email, password, name = "New User", city = "") {
    await hydrate();
    await delay();
    const normalized = normalizeEmail(email);

    if (users.some((u) => u.email === normalized)) {
      throw new Error("An account with this email already exists.");
    }

    const user = { id: `u_${Date.now()}`, email: normalized, password, name, city };
    users.push(user);
    await persistUsers();
    currentSession = { id: user.id, email: user.email, name: user.name, city: user.city };
    await persistSession();

    // There's no real email server in this POC — a real code is still
    // generated and must be entered correctly on the Verification screen,
    // it just can't actually be delivered to an inbox.
    // getPendingVerification() exposes it so that screen can show it as an
    // honest stand-in for "check your email" instead of silently accepting
    // any 4 digits.
    pendingVerification = { email: normalized, code: genCode() };
    await persistPending();

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

  async getPendingVerification() {
    await hydrate();
    return pendingVerification;
  },

  async verifyCode(code) {
    await hydrate();
    await delay(300);
    if (!pendingVerification) {
      throw new Error("Nothing to verify — try signing up again.");
    }
    if (code !== pendingVerification.code) {
      throw new Error("That code doesn't match. Check the digits and try again.");
    }
    pendingVerification = null;
    await persistPending();
    return true;
  },

  async requestPasswordReset(email) {
    await hydrate();
    await delay();
    const normalized = normalizeEmail(email);

    if (!users.some((u) => u.email === normalized)) {
      throw new Error("No account found with that email.");
    }

    // Same "no real email server" honesty as register()'s pendingVerification
    // — the code is generated and required, just surfaced on-screen instead
    // of delivered to an inbox.
    pendingReset = { email: normalized, code: genCode() };
    await persistPendingReset();
    return true;
  },

  async getPendingReset() {
    await hydrate();
    return pendingReset;
  },

  async resetPassword(code, newPassword) {
    await hydrate();
    await delay(300);
    if (!pendingReset) {
      throw new Error("Nothing to reset — request a new code first.");
    }
    if (code !== pendingReset.code) {
      throw new Error("That code doesn't match. Check the digits and try again.");
    }
    const user = users.find((u) => u.email === pendingReset.email);
    if (!user) {
      throw new Error("No account found with that email.");
    }
    user.password = newPassword;
    await persistUsers();
    pendingReset = null;
    await persistPendingReset();
    return true;
  },
};

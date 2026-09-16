// Regex-based validation used by the login/signup flow. Kept separate from
// the ViewModel so the rules are easy to find, test, and reuse elsewhere
// (e.g. a future "edit profile" screen) without duplicating the patterns.

// Standard-shape check: local@domain.tld — deliberately simple for a
// training POC, not a full RFC 5322 implementation.
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// At least 8 characters, at least one letter and one number. Intentionally
// simple for a training POC — not a full password-strength policy.
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

export function isValidEmail(email) {
  return EMAIL_REGEX.test(normalizeEmail(email));
}

export function isValidPassword(password) {
  return PASSWORD_REGEX.test(password || "");
}

// Returns { email: "message" | null, password: "message" | null }
export function validateCredentials(email, password) {
  return {
    email: isValidEmail(email) ? null : "Enter a valid email address.",
    password: isValidPassword(password)
      ? null
      : "Password must be at least 8 characters and include a letter and a number.",
  };
}

// Regex-based validation used by the login/signup flow. Kept separate from
// the ViewModel so the rules are easy to find, test, and reuse elsewhere
// (e.g. a future "edit profile" screen) without duplicating the patterns.

// Accepts formats like "+1 234 567 8900", "+0 (000) 000-00-00", "9876543210".
// Allows leading +, digits, spaces, hyphens, and parentheses; requires at
// least 7 actual digits total so "+()---" alone can't pass.
export const PHONE_REGEX = /^\+?[0-9\s\-()]{7,20}$/;

// At least 8 characters, at least one letter and one number. Intentionally
// simple for a training POC — not a full password-strength policy.
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export function normalizePhone(phone) {
  return (phone || "").replace(/[^\d+]/g, "");
}

export function isValidPhone(phone) {
  if (!PHONE_REGEX.test(phone || "")) return false;
  const digitCount = (phone || "").replace(/\D/g, "").length;
  return digitCount >= 7;
}

export function isValidPassword(password) {
  return PASSWORD_REGEX.test(password || "");
}

// Returns { phone: "message" | null, password: "message" | null }
export function validateCredentials(phone, password) {
  return {
    phone: isValidPhone(phone)
      ? null
      : "Enter a valid phone number (at least 7 digits).",
    password: isValidPassword(password)
      ? null
      : "Password must be at least 8 characters and include a letter and a number.",
  };
}

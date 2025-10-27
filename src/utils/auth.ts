// src/utils/auth.ts

// ✅ Safely access localStorage (only in browser)
function safeStorage() {
  if (typeof window === "undefined") return null;
  return localStorage;
}

// ✅ Save token + user
export function saveAuthToken(token: string, user: any) {
  const storage = safeStorage();
  if (!storage) return;

  storage.setItem("token", token);
  storage.setItem("user", JSON.stringify(user));
}

// ✅ Get token
export function getAuthToken(): string | null {
  const storage = safeStorage();
  if (!storage) return null;
  return storage.getItem("token");
}

// ✅ Get user
export function getUser(): any | null {
  const storage = safeStorage();
  if (!storage) return null;

  const userData = storage.getItem("user");
  return userData ? JSON.parse(userData) : null;
}

// ✅ Remove token + user
export function logout() {
  const storage = safeStorage();
  if (!storage) return;

  storage.removeItem("token");
  storage.removeItem("user");
}

// ✅ Check login state
export function isLoggedIn(): boolean {
  const storage = safeStorage();
  if (!storage) return false;

  return !!storage.getItem("token");
}

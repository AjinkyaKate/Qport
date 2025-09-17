import crypto from "crypto";

const FALLBACK_USERNAME = "admin";
const FALLBACK_PASSWORD = "change-me";
let hasWarnedAboutFallback = false;

const getCredentials = () => {
  const username = process.env.ADMIN_USERNAME || FALLBACK_USERNAME;
  const password = process.env.ADMIN_PASSWORD || FALLBACK_PASSWORD;
  const usingFallback =
    !process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD;

  if (usingFallback) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "ADMIN_USERNAME and ADMIN_PASSWORD must be set in production"
      );
    }

    if (!hasWarnedAboutFallback) {
      console.warn(
        "Using default admin credentials. Set ADMIN_USERNAME and ADMIN_PASSWORD in .env.local to override."
      );
      hasWarnedAboutFallback = true;
    }
  }

  return { username, password };
};

const getToken = () => {
  const { username, password } = getCredentials();
  return crypto
    .createHash("sha256")
    .update(`${username}:${password}`)
    .digest("hex");
};

export const verifyCredentials = (username, password) => {
  try {
    const { username: expectedUsername, password: expectedPassword } =
      getCredentials();

    return username === expectedUsername && password === expectedPassword;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export const createSessionCookie = () => {
  const token = getToken();
  const maxAge = 60 * 60 * 24; // 1 day
  const secure = process.env.NODE_ENV === "production" ? "Secure; " : "";

  return `admin_token=${token}; Path=/; ${secure}HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
};

export const destroySessionCookie = () => {
  const secure = process.env.NODE_ENV === "production" ? "Secure; " : "";
  return `admin_token=deleted; Path=/; ${secure}HttpOnly; SameSite=Lax; Max-Age=0`;
};

export const isRequestAuthenticated = (cookies = {}) => {
  try {
    const token = getToken();
    return cookies.admin_token === token;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

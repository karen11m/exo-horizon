import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "km_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24; // 1 día

function passwordHash() {
  return createHash("sha256")
    .update(process.env.ADMIN_PASSWORD || "")
    .digest("hex");
}

function sessionSecret() {
  return process.env.ADMIN_SECRET || passwordHash();
}

export async function verifyAdminPassword(password) {
  const expected = hashInput(password);
  const actual = passwordHash();
  const a = Buffer.from(actual, "hex");
  const b = Buffer.from(expected, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

function hashInput(value) {
  return createHash("sha256").update(value || "").digest("hex");
}

function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHash("sha256")
    .update(`${body}.${sessionSecret()}`)
    .digest("base64url");
  return `${body}.${sig}`;
}

function verify(token) {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHash("sha256")
    .update(`${body}.${sessionSecret()}`)
    .digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function isAuthenticated() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return Boolean(verify(token));
}

export async function createSession() {
  const store = await cookies();
  const token = sign({ exp: Date.now() + SESSION_TTL_SECONDS * 1000 });
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
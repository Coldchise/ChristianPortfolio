import { createHash, randomBytes } from "crypto";
import { and, eq } from "drizzle-orm";
import { db } from "../../database/drizzle";
import { refreshTokens, users } from "../../database/schema";
import { getDummyHash, hashPassword, verifyPassword } from "../../lib/bcrypt";
import { REFRESH_TOKEN_EXPIRES_MS, signAccessToken } from "../../lib/jwt";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;

function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

export async function registerUser(email: string, password: string) {
  // Hash upfront so timing is identical whether the email exists or not
  const passwordHash = await hashPassword(password);

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
    columns: { id: true },
  });

  if (existing) {
    throw Object.assign(new Error("Email already in use"), { status: 409 });
  }

  const [user] = await db
    .insert(users)
    .values({ email, passwordHash })
    .returning({ id: users.id, email: users.email, createdAt: users.createdAt });

  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await db.query.users.findFirst({ where: eq(users.email, email) });

  if (user?.lockedUntil && user.lockedUntil > new Date()) {
    throw Object.assign(new Error("Account locked. Try again later."), { status: 423 });
  }

  // Always run bcrypt — prevents user-enumeration via response timing
  const hash = user?.passwordHash ?? (await getDummyHash());
  const valid = await verifyPassword(password, hash);

  if (!user || !valid) {
    if (user) {
      const attempts = user.failedLoginAttempts + 1;
      await db
        .update(users)
        .set({
          failedLoginAttempts: attempts,
          lockedUntil:
            attempts >= MAX_FAILED_ATTEMPTS
              ? new Date(Date.now() + LOCKOUT_DURATION_MS)
              : null,
        })
        .where(eq(users.id, user.id));
    }
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });
  }

  await db
    .update(users)
    .set({ failedLoginAttempts: 0, lockedUntil: null, updatedAt: new Date() })
    .where(eq(users.id, user.id));

  const rawToken = randomBytes(64).toString("hex");
  const family = randomBytes(16).toString("hex");

  await db.insert(refreshTokens).values({
    userId: user.id,
    tokenHash: hashToken(rawToken),
    family,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS),
  });

  return {
    accessToken: signAccessToken(user.id),
    rawRefreshToken: rawToken,
  };
}

export async function rotateRefreshToken(rawToken: string) {
  const tokenHash = hashToken(rawToken);

  const stored = await db.query.refreshTokens.findFirst({
    where: eq(refreshTokens.tokenHash, tokenHash),
  });

  if (!stored || stored.revoked) {
    // Token reuse detected — invalidate the entire family to kill stolen sessions
    if (stored) {
      await db
        .update(refreshTokens)
        .set({ revoked: true })
        .where(
          and(
            eq(refreshTokens.userId, stored.userId),
            eq(refreshTokens.family, stored.family),
          ),
        );
    }
    throw Object.assign(new Error("Invalid refresh token"), { status: 401 });
  }

  if (stored.expiresAt < new Date()) {
    throw Object.assign(new Error("Refresh token expired"), { status: 401 });
  }

  await db
    .update(refreshTokens)
    .set({ revoked: true })
    .where(eq(refreshTokens.id, stored.id));

  const newRaw = randomBytes(64).toString("hex");

  await db.insert(refreshTokens).values({
    userId: stored.userId,
    tokenHash: hashToken(newRaw),
    family: stored.family,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS),
  });

  return {
    accessToken: signAccessToken(stored.userId),
    rawRefreshToken: newRaw,
  };
}

export async function logoutUser(rawToken: string) {
  await db
    .update(refreshTokens)
    .set({ revoked: true })
    .where(eq(refreshTokens.tokenHash, hashToken(rawToken)));
}

export async function getUser(userId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { id: true, email: true, createdAt: true },
  });
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  return user;
}

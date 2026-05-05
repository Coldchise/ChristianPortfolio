import bcrypt from "bcryptjs";

const ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Lazily-initialized dummy hash used to prevent user-enumeration timing attacks.
// When a login email doesn't exist we still run bcrypt.compare so response
// time is indistinguishable from a real failed login.
let _dummy: string | null = null;
export async function getDummyHash(): Promise<string> {
  if (_dummy) return _dummy;
  _dummy = await bcrypt.hash("timing_attack_prevention", ROUNDS);
  return _dummy;
}

import type { RequestHandler } from "express";
import type { AuthLocals } from "../../middleware/auth.middleware";
import { loginSchema, registerSchema } from "./auth.validation";
import * as service from "./auth.service";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/api/auth",
};

export const register: RequestHandler = async (req, res, next) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.flatten().fieldErrors });
      return;
    }
    const user = await service.registerUser(result.data.email, result.data.password);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }
    const { accessToken, rawRefreshToken } = await service.loginUser(
      result.data.email,
      result.data.password,
    );
    res.cookie("refresh_token", rawRefreshToken, COOKIE_OPTIONS);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const raw = req.cookies?.refresh_token as string | undefined;
    if (!raw) {
      res.status(401).json({ error: "Missing refresh token" });
      return;
    }
    const { accessToken, rawRefreshToken } = await service.rotateRefreshToken(raw);
    res.cookie("refresh_token", rawRefreshToken, COOKIE_OPTIONS);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    const raw = req.cookies?.refresh_token as string | undefined;
    if (raw) await service.logoutUser(raw);
    res.clearCookie("refresh_token", { path: "/api/auth" });
    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

export const me: RequestHandler = async (_req, res, next) => {
  try {
    const { userId } = res.locals as AuthLocals;
    const user = await service.getUser(userId);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

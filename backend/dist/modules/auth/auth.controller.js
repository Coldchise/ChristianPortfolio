import { loginSchema, registerSchema } from "./auth.validation.js";
import * as service from "./auth.service.js";
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/auth",
};
export const register = async (req, res, next) => {
    try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ error: result.error.flatten().fieldErrors });
            return;
        }
        const user = await service.registerUser(result.data.email, result.data.password);
        res.status(201).json({ user });
    }
    catch (err) {
        next(err);
    }
};
export const login = async (req, res, next) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }
        const { accessToken, rawRefreshToken } = await service.loginUser(result.data.email, result.data.password);
        res.cookie("refresh_token", rawRefreshToken, COOKIE_OPTIONS);
        res.json({ accessToken });
    }
    catch (err) {
        next(err);
    }
};
export const refresh = async (req, res, next) => {
    try {
        const raw = req.cookies?.refresh_token;
        if (!raw) {
            res.status(401).json({ error: "Missing refresh token" });
            return;
        }
        const { accessToken, rawRefreshToken } = await service.rotateRefreshToken(raw);
        res.cookie("refresh_token", rawRefreshToken, COOKIE_OPTIONS);
        res.json({ accessToken });
    }
    catch (err) {
        next(err);
    }
};
export const logout = async (req, res, next) => {
    try {
        const raw = req.cookies?.refresh_token;
        if (raw)
            await service.logoutUser(raw);
        res.clearCookie("refresh_token", { path: "/api/auth" });
        res.json({ message: "Logged out" });
    }
    catch (err) {
        next(err);
    }
};
export const me = async (_req, res, next) => {
    try {
        const { userId } = res.locals;
        const user = await service.getUser(userId);
        res.json({ user });
    }
    catch (err) {
        next(err);
    }
};

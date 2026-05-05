import type { RequestHandler } from "express";
import { db } from "../../database/drizzle";
import { messages } from "../../database/schema";

export const submitContact: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, message } = req.body as {
      name: string;
      email: string;
      message: string;
    };
    await db.insert(messages).values({ name, email, message });
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
};

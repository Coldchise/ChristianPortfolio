import type { RequestHandler } from "express";
import { db } from "../../database/drizzle.js";
import { projects } from "../../database/schema.js";

export const getProjects: RequestHandler = async (_req, res, next) => {
  try {
    const data = await db.select().from(projects);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

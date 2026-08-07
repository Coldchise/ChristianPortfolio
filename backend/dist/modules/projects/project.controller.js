import { db } from "../../database/drizzle";
import { projects } from "../../database/schema";
export const getProjects = async (_req, res, next) => {
    try {
        const data = await db.select().from(projects);
        res.json(data);
    }
    catch (err) {
        next(err);
    }
};

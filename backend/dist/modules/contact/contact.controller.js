import { db } from "../../database/drizzle.js";
import { messages } from "../../database/schema.js";
export const submitContact = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;
        await db.insert(messages).values({ name, email, message });
        res.status(201).json({ success: true });
    }
    catch (err) {
        next(err);
    }
};

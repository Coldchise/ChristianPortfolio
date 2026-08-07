import { db } from "../../database/drizzle";
import { messages } from "../../database/schema";
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

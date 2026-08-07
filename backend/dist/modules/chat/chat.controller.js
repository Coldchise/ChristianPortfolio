import { processChatMessage } from "./chat.service";
export async function handleChat(req, res) {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            res.status(400).json({ error: "Messages array is required." });
            return;
        }
        const reply = await processChatMessage(messages);
        res.json({ reply });
    }
    catch (error) {
        const message = error.message ?? "Internal server error";
        res.status(500).json({ error: message });
    }
}

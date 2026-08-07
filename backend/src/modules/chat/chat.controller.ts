import type { Request, Response } from "express";
import { processChatMessage } from "./chat.service.js";

export async function handleChat(req: Request, res: Response): Promise<void> {
  try {
    const { messages } = req.body as { messages?: Array<{ role: "user" | "assistant"; content: string }> };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Messages array is required." });
      return;
    }

    const reply = await processChatMessage(messages);
    res.json({ reply });
  } catch (error) {
    const message = (error as Error).message ?? "Internal server error";
    res.status(500).json({ error: message });
  }
}

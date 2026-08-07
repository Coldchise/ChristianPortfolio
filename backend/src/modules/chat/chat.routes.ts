import { Router } from "express";
import { handleChat } from "./chat.controller.js";

const router = Router();

router.post("/", handleChat);

export default router;

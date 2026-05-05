import { Router } from "express";
import { submitContact } from "./contact.controller";

const router = Router();

router.post("/", submitContact);

export default router;

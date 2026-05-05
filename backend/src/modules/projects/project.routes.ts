import { Router } from "express";
import { getProjects } from "./project.controller";

const router = Router();

router.get("/", getProjects);

export default router;

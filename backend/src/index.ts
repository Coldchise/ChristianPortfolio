import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { logger } from "./lib/logger";
import authRoutes from "./modules/auth/auth.route";
import contactRoutes from "./modules/contact/contact.routes";
import projectRoutes from "./modules/projects/project.routes";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);

app.use(
  (
    err: { message?: string; status?: number },
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    logger.error(err.message ?? "Unknown error");
    res.status(err.status ?? 500).json({ error: err.message ?? "Internal server error" });
  },
);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

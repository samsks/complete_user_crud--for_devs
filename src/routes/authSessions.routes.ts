import { Router } from "express";
import { ensureIsValidDataMiddleware } from "../middlewares";
import { authSessionController } from "../controllers/authSessions.controller";
import { authSessionReqSchema } from "../schemas/authSessions.schema";

const authRoutes = Router();

authRoutes.post(
  "",
  ensureIsValidDataMiddleware(authSessionReqSchema),
  authSessionController
);

export default authRoutes;

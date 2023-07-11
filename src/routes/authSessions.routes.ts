import { Router } from "express";
import { ensureIsValidDataMiddleware } from "../middlewares";
import { authSessionController } from "../controllers/authSessions.controller";
import {
  authSessionReqSchema,
  refreshTokenReqSchema,
} from "../schemas/authSessions.schema";

const authRoutes = Router();

authRoutes.post(
  "/login",
  ensureIsValidDataMiddleware(authSessionReqSchema),
  authSessionController
);
authRoutes.post("/refresh", ensureIsValidDataMiddleware(refreshTokenReqSchema));

export default authRoutes;

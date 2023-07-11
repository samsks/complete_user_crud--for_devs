import { Router } from "express";
import { ensureIsValidDataMiddleware } from "../middlewares";
import {
  authSessionController,
  refreshTokenController,
} from "../controllers/authSessions.controller";
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
authRoutes.post(
  "/refresh",
  ensureIsValidDataMiddleware(refreshTokenReqSchema),
  refreshTokenController
);

export default authRoutes;

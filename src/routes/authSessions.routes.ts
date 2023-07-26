import { Router } from "express";
import middlewares from "../middlewares";
import controllers from "../controllers/authSessions.controller";
import authSchemas from "../schemas/authSessions.schema";

const authRoutes: Router = Router();

authRoutes.post(
  "/login",
  middlewares.ensureIsValidData(authSchemas.authSessionReq),
  controllers.authSession
);
authRoutes.post(
  "/refresh",
  middlewares.ensureIsValidData(authSchemas.refreshTokenReq),
  controllers.refreshToken
);

export default authRoutes;

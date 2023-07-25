import { Handler, Response } from "express";
import {
  authSessionService,
  refreshTokenService,
} from "../services/authSessions";
import {
  iAuthSessionRes,
  iRefreshTokenRes,
} from "../interfaces/authSession.interface";

const authSessionController: Handler = async (req, res): Promise<Response> => {
  const tokens: iAuthSessionRes = await authSessionService(req.body);
  return res.status(200).json(tokens);
};

const refreshTokenController: Handler = async (req, res): Promise<Response> => {
  const tokens: iRefreshTokenRes = await refreshTokenService(req.body);
  return res.status(200).json(tokens);
};

export { authSessionController, refreshTokenController };

import { Handler, Response } from "express";
import {
  authSessionService,
  refreshTokenService,
} from "../services/authSessions";

const authSessionController: Handler = async (req, res): Promise<Response> => {
  const tokens = await authSessionService(req.body);
  return res.status(200).json(tokens);
};

const refreshTokenController: Handler = async (req, res): Promise<Response> => {
  const tokens = await refreshTokenService(req.body);
  return res.status(200).json(tokens);
};

export { authSessionController, refreshTokenController };

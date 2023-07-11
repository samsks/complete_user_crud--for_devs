import { Handler } from "express";
import {
  authSessionService,
  refreshTokenService,
} from "../services/authSessions";

const authSessionController: Handler = async (req, res) => {
  const tokens = await authSessionService(req.body);
  return res.status(200).send(tokens);
};

const refreshTokenController: Handler = async (req, res) => {
  const tokens = await refreshTokenService(req.body);
  return res.status(200).send(tokens);
};

export { authSessionController, refreshTokenController };

import { Handler, Response } from "express";
import services from "../services/authSessions";
import {
  iAuthSessionRes,
  iRefreshTokenRes,
} from "../interfaces/authSession.interface";

const authSession: Handler = async (req, res): Promise<Response> => {
  const tokens: iAuthSessionRes = await services.authSession(req.body);
  return res.status(200).json(tokens);
};

const refreshToken: Handler = async (req, res): Promise<Response> => {
  const tokens: iRefreshTokenRes = await services.refreshToken(req.body);
  return res.status(200).json(tokens);
};

export default { authSession, refreshToken };

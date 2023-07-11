import { z } from "zod";
import {
  authSessionReqSchema,
  authSessionResSchema,
  refreshTokenReqSchema,
  refreshTokenResSchema,
} from "../schemas/authSessions.schema";

type iAuthSessionReq = z.infer<typeof authSessionReqSchema>;
type iAuthSessionRes = z.infer<typeof authSessionResSchema>;

type iRefreshTokenReq = z.infer<typeof refreshTokenReqSchema>;
type iRefreshTokenRes = z.infer<typeof refreshTokenResSchema>;

export { iAuthSessionReq, iAuthSessionRes, iRefreshTokenReq, iRefreshTokenRes };

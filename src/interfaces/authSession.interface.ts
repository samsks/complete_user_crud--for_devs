import { z } from "zod";
import authSchemas from "../schemas/authSessions.schema";

type iAuthSessionReq = z.infer<typeof authSchemas.authSessionReq>;
type iAuthSessionRes = z.infer<typeof authSchemas.authSessionRes>;

type iRefreshTokenReq = z.infer<typeof authSchemas.refreshTokenReq>;
type iRefreshTokenRes = z.infer<typeof authSchemas.refreshTokenRes>;

export { iAuthSessionReq, iAuthSessionRes, iRefreshTokenReq, iRefreshTokenRes };

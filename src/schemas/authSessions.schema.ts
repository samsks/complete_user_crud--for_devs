import { z } from "zod";
import userSchemas from "../schemas/users.schema";

const authSessionReq = userSchemas.userReq.pick({
  email: true,
  password: true,
});
const authSessionRes = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

const refreshTokenReq = authSessionRes.pick({
  refresh_token: true,
});
const refreshTokenRes = authSessionRes;

export default {
  authSessionReq,
  authSessionRes,
  refreshTokenReq,
  refreshTokenRes,
};

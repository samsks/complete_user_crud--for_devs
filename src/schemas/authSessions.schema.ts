import { z } from "zod";
import { userReqSchema } from "../schemas/users.schema";

const authSessionReqSchema = userReqSchema.pick({
  email: true,
  password: true,
});
const authSessionResSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

const refreshTokenReqSchema = authSessionResSchema.pick({
  refresh_token: true,
});
const refreshTokenResSchema = authSessionResSchema;

export {
  authSessionReqSchema,
  authSessionResSchema,
  refreshTokenReqSchema,
  refreshTokenResSchema,
};

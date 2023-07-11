import { z } from "zod";
import { userReqSchema } from "../schemas/users.schema";

const authSessionReqSchema = userReqSchema.pick({
  email: true,
  password: true,
});
const authSessionResSchema = z.object({
  token: z.string(),
  refresh: z.string(),
});

const refreshTokenReqSchema = authSessionResSchema.pick({ refresh: true });
const refreshTokenResSchema = authSessionResSchema.pick({ token: true });

export {
  authSessionReqSchema,
  authSessionResSchema,
  refreshTokenReqSchema,
  refreshTokenResSchema,
};

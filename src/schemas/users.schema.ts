import { z } from "zod";
import { isValidDate } from "../utils/schemaValidations/user.scripts";
import avatarSchemas from "./photos.schemas";

const userReq = z.object({
  username: z.string().max(20),
  email: z.string().email().max(50),
  password: z.string().max(127),
  avatar: avatarSchemas.avatarReq.shape.avatar.optional(),
  first_name: z.string().max(30),
  middle_name: z.string().max(30).nullish(),
  last_name: z.string().max(20),
  phone_number: z
    .string()
    .max(18)
    .regex(/^[0-9]+$/, "The phone number must contain only numbers"),
  birthday: z.string().refine(isValidDate, {
    message: "Invalid date. Format must be YYYY-MM-DD",
  }),
});

const userRes = userReq
  .extend({
    id: z.string().uuid(),
    created_at: z.date(),
  })
  .omit({
    password: true,
  });

const superuserRes = userReq
  .extend({
    id: z.string().uuid(),
    is_superuser: z.boolean(),
    reset_token: z.string().nullable(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().nullable(),
  })
  .omit({
    password: true,
    avatar: true,
  });

const usersListRes = superuserRes.array();

const userUpdateReq = userReq
  .omit({
    avatar: true,
  })
  .partial();

const userUpdateRes = userRes.extend({
  updated_at: z.date(),
});

const userReqLocals = superuserRes.extend({
  password: z.string(),
});

export default {
  userReq,
  userRes,
  superuserRes,
  usersListRes,
  userUpdateReq,
  userUpdateRes,
  userReqLocals,
};

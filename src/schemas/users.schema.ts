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
  .omit({
    password: true,
  })
  .extend({
    id: z.string().uuid(),
    created_at: z.date(),
  });

const userResLocals = userRes.extend({
  avatar: avatarSchemas.avatarRes.nullish(),
});

const userResWithAvatar = userRes.extend({
  avatar: avatarSchemas.avatarResUser.shape.avatar.nullish(),
});

const superuserRes = userRes.extend({
  updated_at: z.date(),
  deleted_at: z.date().nullable(),
  is_superuser: z.boolean(),
  reset_token: z.string().nullable(),
});

const superuserPagRes = z.object({
  prevPage: z.string().nullable(),
  nextPage: z.string().nullable(),
  count: z.number(),
  data: superuserRes.array(),
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

export default {
  userReq,
  userRes,
  userResLocals,
  userResWithAvatar,
  superuserRes,
  superuserPagRes,
  usersListRes,
  userUpdateReq,
  userUpdateRes,
};

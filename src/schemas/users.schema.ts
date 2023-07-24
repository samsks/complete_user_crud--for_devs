import { z } from "zod";
import { isValidDate } from "../utils/schemaValidations/user.scripts";
import { isValidFileExtension } from "../utils/schemaValidations/avatar.scripts";

const userReqSchema = z.object({
  username: z.string().max(20),
  email: z.string().email().max(50),
  password: z.string().max(127),
  avatar: z
    .any()
    .refine((value) => {
      if (!value || typeof value !== "object" || !("fieldname" in value)) {
        return true;
      }
      return isValidFileExtension(value.originalname);
    })
    .optional(),
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

const userResSchema = userReqSchema
  .extend({
    id: z.string().uuid(),
    created_at: z.date(),
  })
  .omit({
    password: true,
  });

const superuserResSchema = userReqSchema
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

const usersListResSchema = superuserResSchema.array();

const userUpdateReqSchema = userReqSchema
  .omit({
    avatar: true,
  })
  .partial();

const userUpdateResSchema = userResSchema.extend({
  updated_at: z.date(),
});

const userReqLocalsSchema = superuserResSchema.extend({
  password: z.string(),
});

export {
  userReqSchema,
  userResSchema,
  superuserResSchema,
  usersListResSchema,
  userUpdateReqSchema,
  userUpdateResSchema,
  userReqLocalsSchema,
};

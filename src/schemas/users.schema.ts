import { z } from "zod";
import { isValid, parseISO } from "date-fns";

const isValidDate = (value: string) => {
  const date = parseISO(value);
  return isValid(date) && value.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};

const userReqSchema = z.object({
  username: z.string().max(20),
  email: z.string().email().max(50),
  password: z.string().max(127),
  profile_image: z.string().max(127).nullable(),
  first_name: z.string().max(30),
  middle_name: z.string().max(30).nullable(),
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

export { userReqSchema, userResSchema };

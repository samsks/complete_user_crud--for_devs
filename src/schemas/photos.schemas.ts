import { z } from "zod";
import { isValidFileExtension } from "../utils/schemaValidations/avatar.scripts";

const avatarReq = z.object({
  avatar: z.any().refine((value) => {
    if (!value || typeof value !== "object" || !("fieldname" in value)) {
      return true;
    }
    return isValidFileExtension(value.originalname);
  }),
});

const avatarRes = z.object({
  id: z.string().uuid(),
  name: z.string(),
  path: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullish(),
});

const avatarResUser = z.object({
  avatar: z.string(),
});

export default { avatarReq, avatarRes, avatarResUser };

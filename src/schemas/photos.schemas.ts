import { z } from "zod";
import { isValidFileExtension } from "../utils/schemaValidations/avatar.scripts";

const avatarReqSchema = z.object({
  avatar: z.any().refine((value) => {
    if (!value || typeof value !== "object" || !("fieldname" in value)) {
      return true;
    }
    return isValidFileExtension(value.originalname);
  }),
});

const avatarResSchema = avatarReqSchema;

export { avatarReqSchema, avatarResSchema };

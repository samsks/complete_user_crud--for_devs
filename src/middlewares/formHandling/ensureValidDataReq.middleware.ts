import { Handler } from "express";
import { ZodTypeAny } from "zod";

const ensureIsValidData =
  (schema: ZodTypeAny): Handler =>
  (req, res, next): void => {
    req.body = schema.parse(req.body);

    return next();
  };

export default ensureIsValidData;

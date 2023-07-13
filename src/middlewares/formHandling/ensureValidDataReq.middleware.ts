import { Handler } from "express";
import { ZodTypeAny } from "zod";

const ensureIsValidDataMiddleware =
  (schema: ZodTypeAny): Handler =>
  (req, res, next) => {
    const validateData = schema.parse(req.body);

    req.body = validateData;

    return next();
  };

export default ensureIsValidDataMiddleware;

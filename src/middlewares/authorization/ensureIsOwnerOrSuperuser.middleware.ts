import { Handler } from "express";
import AppError from "../../errors/AppError";

const ensureIsOwnerOrSuperuserMiddleware: Handler = async (req, res, next) => {
  if (!req.user.is_superuser && req.user.id != req.params.userId) {
    throw new AppError("Missing permissions", 401);
  }

  return next();
};

export default ensureIsOwnerOrSuperuserMiddleware;

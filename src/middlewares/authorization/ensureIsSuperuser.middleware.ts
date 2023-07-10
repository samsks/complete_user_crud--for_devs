import { Handler } from "express";
import AppError from "../../errors/AppError";

const ensureIsSuperuserMiddleware: Handler = async (req, res, next) => {
  const { is_superuser } = req.user;

  if (!is_superuser) {
    throw new AppError("Missing admin permissions", 401);
  }

  next();
};

export default ensureIsSuperuserMiddleware;

import { Handler } from "express";
import AppError from "../../errors/AppError";

const ensureIsSuperuser: Handler = async (req, res, next): Promise<void> => {
  const { is_superuser } = res.locals.decoded;

  if (!is_superuser) throw new AppError("Missing admin permissions", 401);

  next();
};

export default ensureIsSuperuser;

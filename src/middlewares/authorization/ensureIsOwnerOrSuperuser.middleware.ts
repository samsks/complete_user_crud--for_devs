import { Handler } from "express";
import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";

const ensureIsOwnerOrSuperuserMiddleware: Handler = async (req, res, next) => {
  const userId = req.params.userId !== undefined ? req.params.userId : null;

  if (userId) {
    if (
      !req.user.is_superuser &&
      req.user.id != (req.params.userId && req.params.userId != undefined)
    ) {
      throw new AppError("Missing permissions", 401);
    }
    const userRepository = AppDataSource.getRepository(User);
    const findUser = await userRepository.findOneBy({ id: userId });

    if (!findUser) {
      throw new AppError("UserID not exists", 404);
    }

    req.locals = req.locals
      ? { ...req.locals, user: findUser }
      : { user: findUser };
  }

  return next();
};

export default ensureIsOwnerOrSuperuserMiddleware;

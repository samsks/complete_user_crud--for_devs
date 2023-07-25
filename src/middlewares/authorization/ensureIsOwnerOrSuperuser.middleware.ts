import { Handler } from "express";
import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { iUser, iUserEntity } from "../../interfaces/users.interface";

const ensureIsOwnerOrSuperuserMiddleware: Handler = async (req, res, next) => {
  const userId: string | null =
    req.params.userId !== undefined ? req.params.userId : null;

  if (userId) {
    if (!req.user.is_superuser && req.user.id != userId)
      throw new AppError("Missing permissions", 401);

    const userRepository: iUserEntity = AppDataSource.getRepository(User);
    const findUser: iUser | null = await userRepository.findOne({
      where: { id: userId },
      relations: ["avatar"],
    });

    if (!findUser) throw new AppError("UserID not exists", 404);

    req.locals = req.locals
      ? { ...req.locals, userRepository: userRepository }
      : { userRepository: userRepository };

    req.locals = req.locals
      ? { ...req.locals, user: findUser }
      : { user: findUser };
  }

  return next();
};

export default ensureIsOwnerOrSuperuserMiddleware;

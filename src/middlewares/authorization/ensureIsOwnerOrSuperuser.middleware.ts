import { Handler } from "express";
import AppError from "../../errors/AppError";
import { iUser } from "../../interfaces/users.interface";
import { userRepository } from "../../repositories";

const ensureIsOwnerOrSuperuser: Handler = async (req, res, next) => {
  const userId: string | null =
    req.params.userId !== undefined ? req.params.userId : null;

  if (userId) {
    if (!req.user.is_superuser && req.user.id != userId)
      throw new AppError("Missing permissions", 401);

    const foundUser: iUser | null = await userRepository.findOne({
      where: { id: userId },
      relations: ["avatar"],
    });

    if (!foundUser) throw new AppError("UserID not exists", 404);

    req.locals = { ...req.locals, user: foundUser };
  }

  return next();
};

export default ensureIsOwnerOrSuperuser;

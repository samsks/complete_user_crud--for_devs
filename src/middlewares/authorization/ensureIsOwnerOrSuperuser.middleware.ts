import { Handler } from "express";
import AppError from "../../errors/AppError";
import { iUser } from "../../interfaces/users.interface";
import { userRepository } from "../../repositories";

const ensureIsOwnerOrSuperuser: Handler = async (req, res, next) => {
  const userId: string | null =
    req.params.userId !== undefined ? req.params.userId : null;

  if (userId) {
    const { is_superuser, sub } = res.locals.decoded;

    if (!is_superuser && sub != userId)
      throw new AppError("Missing permissions", 401);

    const paramsUser: iUser | null = await userRepository.findOne({
      where: { id: userId },
      relations: ["avatar"],
    });

    if (!paramsUser) throw new AppError("UserID not exists", 404);

    res.locals = { ...res.locals, paramsUser };
  }

  return next();
};

export default ensureIsOwnerOrSuperuser;

import { Handler } from "express";
import AppDataSource from "../../../data-source";
import User from "../../../entities/user.entity";
import AppError from "../../../errors/AppError";
import { iUser } from "../../../interfaces/users.interface";

const ensureEmailExistsMiddleware: Handler = async (
  req,
  res,
  next
): Promise<void> => {
  const userRepository =
    req.method === "POST"
      ? AppDataSource.getRepository(User)
      : req.locals?.userRepository!;

  const findUser: iUser | null = await userRepository.findOne({
    where: { email: req.body.email },
    withDeleted: true,
  });

  if (findUser) throw new AppError("Email already registered", 409);

  return next();
};

export default ensureEmailExistsMiddleware;

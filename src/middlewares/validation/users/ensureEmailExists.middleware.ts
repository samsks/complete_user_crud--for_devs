import { Handler } from "express";
import AppDataSource from "../../../data-source";
import User from "../../../entities/user.entity";
import AppError from "../../../errors/AppError";

const ensureEmailExistsMiddleware: Handler = async (req, res, next) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: { email: req.body.email },
    withDeleted: true,
  });

  if (findUser) {
    throw new AppError("Email already registered", 409);
  }

  return next();
};

export default ensureEmailExistsMiddleware;

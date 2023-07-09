import { Handler } from "express";
import AppDataSource from "../../../data-source";
import User from "../../../entities/user.entity";
import AppError from "../../../errors/AppError";

const ensureUsernameExistsMiddleware: Handler = async (req, res, next) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    username: req.body.username,
  });

  if (findUser) {
    throw new AppError("Username already registered", 409);
  }

  return next();
};

export default ensureUsernameExistsMiddleware;
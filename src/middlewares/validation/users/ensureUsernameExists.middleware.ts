import { Handler } from "express";
import AppDataSource from "../../../data-source";
import User from "../../../entities/user.entity";
import AppError from "../../../errors/AppError";
import { iUser, iUserEntity } from "../../../interfaces/users.interface";

const ensureUsernameExists: Handler = async (req, res, next): Promise<void> => {
  const userRepository: iUserEntity =
    req.method === "POST"
      ? AppDataSource.getRepository(User)
      : req.locals?.userRepository!;

  if (req.body.username) {
    const findUser: iUser | null = await userRepository.findOne({
      where: { username: req.body.username },
      withDeleted: true,
    });

    if (findUser && req.locals?.user?.username !== findUser.username)
      throw new AppError("Username already registered", 409);
  }

  return next();
};

export default ensureUsernameExists;

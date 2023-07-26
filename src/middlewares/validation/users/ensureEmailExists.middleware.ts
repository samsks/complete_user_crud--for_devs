import { Handler } from "express";
import AppDataSource from "../../../data-source";
import User from "../../../entities/user.entity";
import AppError from "../../../errors/AppError";
import { iUser, iUserEntity } from "../../../interfaces/users.interface";

const ensureEmailExists: Handler = async (req, res, next): Promise<void> => {
  const userRepository: iUserEntity =
    req.method === "POST"
      ? AppDataSource.getRepository(User)
      : req.locals?.userRepository!;

  if (req.body.email) {
    const findUser: iUser | null = await userRepository.findOne({
      where: { email: req.body.email },
      withDeleted: true,
    });

    if (findUser && req.locals?.user?.email !== findUser.email)
      throw new AppError("Email already registered", 409);
  }

  return next();
};

export default ensureEmailExists;

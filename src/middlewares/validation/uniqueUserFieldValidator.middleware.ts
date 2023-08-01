import { Handler } from "express";
import AppError from "../../errors/AppError";
import { iUser, iUserEntity } from "../../interfaces/users.interface";
import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";

const uniqueUserFieldValidator =
  (field: keyof User): Handler =>
  async (req, res, next): Promise<void> => {
    const userRepository: iUserEntity =
      req.method === "POST"
        ? AppDataSource.getRepository(User)
        : req.locals?.userRepository!;

    if (req.body[field]) {
      const findUser: iUser | null = await userRepository.findOne({
        where: { [field]: req.body[field] },
        withDeleted: true,
      });

      if (findUser && req.locals?.user?.[field] !== findUser[field])
        throw new AppError(
          `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } already registered`,
          409
        );
    }

    return next();
  };

export default uniqueUserFieldValidator;

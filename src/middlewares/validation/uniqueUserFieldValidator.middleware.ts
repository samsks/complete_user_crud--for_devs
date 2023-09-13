import { Handler } from "express";
import AppError from "../../errors/AppError";
import { iUser } from "../../interfaces/users.interface";
import User from "../../entities/user.entity";
import { userRepository } from "../../repositories";

const uniqueUserFieldValidator =
  (field: keyof User): Handler =>
  async (req, res, next): Promise<void> => {
    if (req.body[field]) {
      const foundUser: iUser | null = await userRepository.findOne({
        where: { [field]: req.body[field] },
        withDeleted: true,
      });

      if (foundUser && res.locals.paramsUser?.[field] !== foundUser[field])
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

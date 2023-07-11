import AppDataSource from "../../data-source";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../../entities/user.entity";
import { compare } from "bcryptjs";
import { iUserEntity } from "../../interfaces/users.interface";
import AppError from "../../errors/AppError";
import {
  iAuthSessionReq,
  iAuthSessionRes,
} from "../../interfaces/authSession.interface";

const authSessionService = async ({ email, password }: iAuthSessionReq) => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new AppError("Client or Password invalid", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Client or Password invalid", 403);
  }

  const loginToken = jwt.sign(
    {
      is_superuser: user.is_superuser,
    },
    process.env.TOKEN_SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    }
  );

  const refreshToken = jwt.sign(
    {
      is_superuser: user.is_superuser,
    },
    process.env.REFRESH_SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: process.env.REFRESH_EXPIRATION_TIME,
    }
  );

  return { token: loginToken, refresh: refreshToken } as iAuthSessionRes;
};

export default authSessionService;

import AppDataSource from "../../data-source";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../../entities/user.entity";
import { compare } from "bcryptjs";
import { iUser, iUserEntity } from "../../interfaces/users.interface";
import AppError from "../../errors/AppError";
import {
  iAuthSessionReq,
  iAuthSessionRes,
} from "../../interfaces/authSession.interface";

const authSession = async ({
  email,
  password,
}: iAuthSessionReq): Promise<iAuthSessionRes> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  const user: iUser | null = await userRepository
    .createQueryBuilder("users")
    .where("users.email = :email", { email })
    .withDeleted()
    .getOne();

  if (!user) throw new AppError("Client or Password invalid", 403);

  const passwordMatch: boolean = await compare(password, user.password);

  if (!passwordMatch) throw new AppError("Client or Password invalid", 403);

  if (user.deleted_at) throw new AppError("The user is deactivated", 403);

  const loginToken: string = jwt.sign(
    {
      is_superuser: user.is_superuser,
    },
    process.env.TOKEN_SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    }
  );

  const refreshToken: string = jwt.sign(
    {
      is_superuser: user.is_superuser,
    },
    process.env.REFRESH_SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: process.env.REFRESH_EXPIRATION_TIME,
    }
  );

  return {
    access_token: loginToken,
    refresh_token: refreshToken,
  } as iAuthSessionRes;
};

export default authSession;

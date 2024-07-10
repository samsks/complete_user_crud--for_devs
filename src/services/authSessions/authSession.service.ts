import { sign } from "jsonwebtoken";
import "dotenv/config";
import { compare } from "bcryptjs";
import { iUser } from "../../interfaces/users.interface";
import AppError from "../../errors/AppError";
import {
  iAuthSessionReq,
  iAuthSessionRes,
} from "../../interfaces/authSession.interface";
import { userRepository } from "../../repositories";

const authSession = async ({
  email,
  password,
}: iAuthSessionReq): Promise<iAuthSessionRes> => {
  const foundUser: iUser | null = await userRepository
    .createQueryBuilder("users")
    .where("users.email = :email", { email })
    .withDeleted()
    .getOne();

  if (!foundUser) throw new AppError("Invalid credentials", 403);

  const passwordMatch: boolean = await compare(password, foundUser.password);

  if (!passwordMatch) throw new AppError("Invalid credentials", 403);

  if (foundUser.deleted_at) throw new AppError("The user is deactivated", 403);

  const loginToken: string = sign(
    {
      is_superuser: foundUser.is_superuser,
    },
    process.env.TOKEN_SECRET_KEY as string,
    {
      subject: foundUser.id,
      expiresIn: process.env.TOKEN_EXPIRATION_TIME ?? "1d",
    }
  );

  const refreshToken: string = sign(
    {
      is_superuser: foundUser.is_superuser,
    },
    process.env.REFRESH_SECRET_KEY as string,
    {
      subject: foundUser.id,
      expiresIn: process.env.REFRESH_EXPIRATION_TIME ?? "7d", // Provide a default value for expiresIn
    }
  );

  return {
    access_token: loginToken,
    refresh_token: refreshToken,
  } as iAuthSessionRes;
};

export default authSession;

import jwt from "jsonwebtoken";
import {
  iRefreshTokenReq,
  iRefreshTokenRes,
} from "../../interfaces/authSession.interface";
import { iUser } from "../../interfaces/users.interface";
import AppError from "../../errors/AppError";
import { userRepository } from "../../repositories";

const refreshToken = async ({
  refresh_token,
}: iRefreshTokenReq): Promise<iRefreshTokenRes> => {
  const decodedToken = jwt.verify(
    refresh_token,
    process.env.REFRESH_SECRET_KEY as string
  ) as { sub: string };

  const user: iUser | null = await userRepository.findOneBy({
    id: decodedToken.sub,
  });

  if (!user) throw new AppError("Invalid refresh token", 403);

  try {
    jwt.verify(refresh_token, process.env.REFRESH_SECRET_KEY as string, {
      ignoreExpiration: false,
    });
  } catch (err) {
    throw new AppError("Invalid refresh token", 403);
  }

  const newToken: string = jwt.sign(
    {
      is_superuser: user.is_superuser,
    },
    process.env.TOKEN_SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: process.env.TOKEN_EXPIRATION_TIME ?? "1d", // Provide a default value or convert to string/number
    }
  );

  const newRefreshToken: string = jwt.sign(
    {
      is_superuser: user.is_superuser,
    },
    process.env.REFRESH_SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: process.env.REFRESH_EXPIRATION_TIME ?? "7d",
    }
  );

  return {
    access_token: newToken,
    refresh_token: newRefreshToken,
  } as iRefreshTokenRes;
};

export default refreshToken;

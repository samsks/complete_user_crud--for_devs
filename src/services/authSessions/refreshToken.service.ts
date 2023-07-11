import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import jwt from "jsonwebtoken";
import {
  iRefreshTokenReq,
  iRefreshTokenRes,
} from "../../interfaces/authSession.interface";
import { iUserEntity } from "../../interfaces/users.interface";
import AppError from "../../errors/AppError";

const refreshTokenService = async ({
  refresh_token,
}: iRefreshTokenReq): Promise<iRefreshTokenRes> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  const decodedToken = jwt.verify(
    refresh_token,
    process.env.REFRESH_SECRET_KEY as string
  ) as { sub: string };

  const user = await userRepository.findOneBy({
    id: decodedToken.sub,
  });

  if (!user) {
    throw new AppError("Invalid refresh token", 403);
  }

  try {
    jwt.verify(refresh_token, process.env.REFRESH_SECRET_KEY as string, {
      ignoreExpiration: false,
    });
  } catch (err) {
    throw new AppError("Invalid refresh token", 403);
  }

  const newToken = jwt.sign(
    {
      is_superuser: user.is_superuser,
    },
    process.env.TOKEN_SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    }
  );

  const newRefreshToken = jwt.sign(
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
    access_token: newToken,
    refresh_token: newRefreshToken,
  } as iRefreshTokenRes;
};

export default refreshTokenService;

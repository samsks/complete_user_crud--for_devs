import { Handler } from "express";
import { verify } from "jsonwebtoken";
import "dotenv/config";
import AppError from "../../errors/AppError";

const ensureAuth: Handler = async (req, res, next): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) throw new AppError("Invalid token", 401);

  const [_bearer, token]: Array<string> = authorization.split(" ");

  res.locals = {
    ...res.locals,
    decoded: verify(token, process.env.TOKEN_SECRET_KEY!),
  };

  return next();
};

export default ensureAuth;

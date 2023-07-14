import { Handler } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError from "../../errors/AppError";

const ensureAuthMiddleware: Handler = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Invalid token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.TOKEN_SECRET_KEY as string,
    (error, decoded: any) => {
      if (error) {
        let message = error.message;

        if (message.includes("jwt")) {
          message = message.replace("jwt", "token");
        }
        throw new AppError(message, 401);
      }

      req.user = {
        id: decoded.sub as string,
        is_superuser: decoded.is_superuser,
      };

      return next();
    }
  );
};

export default ensureAuthMiddleware;

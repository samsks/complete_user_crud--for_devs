import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "../../errors/AppError";
import "express-async-errors";
import { JsonWebTokenError } from "jsonwebtoken";

const handleError = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({
      message: err.message,
    });

  if (err instanceof ZodError)
    return res.status(400).json({
      message: err.flatten().fieldErrors,
    });

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ message: err.message });
  }

  console.error(err);

  return res.status(500).json({
    message: `Internal server error: ${err.message}`,
  });
};

export default handleError;

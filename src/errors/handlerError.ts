import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "../errors/AppError";
import "express-async-errors";

const handleError = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (err instanceof AppError)
    res.status(err.statusCode).json({
      message: err.message,
    });
  else if (err instanceof ZodError)
    res.status(400).json({
      message: err.flatten().fieldErrors,
    });

  console.error(err);

  res.status(500).json({
    message: `Internal server error: ${err.message}`,
  });
};

export default handleError;

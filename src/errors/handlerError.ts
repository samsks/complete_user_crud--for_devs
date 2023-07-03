import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "../errors/AppError";
import "express-async-errors";

const handleError = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  } else if (err instanceof ZodError) {
    return res.status(400).send({
      message: err.flatten().fieldErrors,
    });
  }

  console.error(err);

  return res.status(500).send({
    message: `Internal server error: ${err.message}`,
  });
};

export default handleError;

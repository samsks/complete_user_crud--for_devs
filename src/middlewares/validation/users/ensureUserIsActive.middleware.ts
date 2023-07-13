import { Handler } from "express";
import AppDataSource from "../../../data-source";
import User from "../../../entities/user.entity";
import AppError from "../../../errors/AppError";

const ensureUserIsActiveMiddleware: Handler = async (req, res, next) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository
    .createQueryBuilder("users")
    .where("users.id = :id", { id: req.params.userId })
    .withDeleted()
    .getOne();

  if (!findUser) {
    throw new AppError("UserID not exists", 404);
  }

  const API_DETAIL = process.env.API_DETAIL;

  // console.log(1, req.path);
  // console.log(2, req.baseUrl);
  // console.log(3, req.originalUrl);
  // console.log(
  //   4,
  //   !req.originalUrl.startsWith(`/api/${API_DETAIL}/users/activate/`)
  // );

  if (
    req.originalUrl.startsWith(`/api/${API_DETAIL}/users/deactivate/`) &&
    findUser.deleted_at
  ) {
    throw new AppError("The user is already deactivated", 403);
  }
  // else if (
  //   findUser.deleted_at &&
  //   !req.originalUrl.startsWith(`/api/${API_DETAIL}/users/activate/`)
  // ) {
  //   throw new AppError("The user is deactivated", 403);
  // }
  // else if (findUser.deleted_at) {
  //   throw new AppError("Disabled User", 403);
  // }

  req.locals = req.locals
    ? { ...req.locals, user: findUser }
    : { user: findUser };

  return next();
};

export default ensureUserIsActiveMiddleware;

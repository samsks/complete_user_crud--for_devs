import { Router } from "express";
import {
  ensureEmailExistsMiddleware,
  ensureIsValidDataMiddleware,
  ensureUsernameExistsMiddleware,
} from "../middlewares";
import { userReqSchema } from "../schemas/users.schema";
import createUserController from "../controllers/users/createUser.controller";

const usersRoutes = Router();

usersRoutes.post(
  "",
  ensureIsValidDataMiddleware(userReqSchema),
  ensureEmailExistsMiddleware,
  ensureUsernameExistsMiddleware,
  createUserController
);

export default usersRoutes;

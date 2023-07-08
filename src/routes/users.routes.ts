import { Router } from "express";
import {
  ensureEmailExistsMiddleware,
  ensureIsValidDataMiddleware,
} from "../middlewares";
import { userReqSchema } from "../schemas/users.schema";
import createUserController from "../controllers/users/createUser.controller";

const usersRoutes = Router();

usersRoutes.post(
  "",
  ensureIsValidDataMiddleware(userReqSchema),
  ensureEmailExistsMiddleware,
  createUserController
);

export default usersRoutes;

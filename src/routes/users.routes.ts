import { Router } from "express";
import {
  ensureEmailExistsMiddleware,
  ensureIsValidDataMiddleware,
  ensureUsernameExistsMiddleware,
} from "../middlewares";
import { userReqSchema } from "../schemas/users.schema";
import {
  createUserController,
  retrieveUserByIdController,
} from "../controllers/users.controller";

const usersRoutes = Router();

usersRoutes.post(
  "",
  ensureIsValidDataMiddleware(userReqSchema),
  ensureEmailExistsMiddleware,
  ensureUsernameExistsMiddleware,
  createUserController
);

usersRoutes.get("/:userId", retrieveUserByIdController);

export default usersRoutes;

import { Router } from "express";
import {
  ensureEmailExistsMiddleware,
  ensureIsValidDataMiddleware,
  ensureUsernameExistsMiddleware,
} from "../middlewares";
import { userReqSchema, userUpdateReqSchema } from "../schemas/users.schema";
import {
  createUserController,
  deleteUserController,
  retrieveUserByIdController,
  retrieveUsersController,
  updateUserController,
} from "../controllers/users.controller";

const usersRoutes = Router();

usersRoutes.post(
  "",
  ensureIsValidDataMiddleware(userReqSchema),
  ensureEmailExistsMiddleware,
  ensureUsernameExistsMiddleware,
  createUserController
);

usersRoutes.get("", retrieveUsersController);

usersRoutes.get("/:userId", retrieveUserByIdController);

usersRoutes.patch(
  "/:userId",
  ensureIsValidDataMiddleware(userUpdateReqSchema),
  updateUserController
);

usersRoutes.delete("/:userId", deleteUserController);

export default usersRoutes;

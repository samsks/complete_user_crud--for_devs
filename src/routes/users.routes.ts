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
  disableUserController,
  enableUserController,
  retrieveUserByIdController,
  retrieveUsersController,
  updateUserController,
} from "../controllers/users.controller";

const usersRoutes = Router();

usersRoutes.delete("/:userId", deleteUserController);

usersRoutes.delete("/:userId/deactivate", disableUserController);

usersRoutes.get("", retrieveUsersController);

usersRoutes.get("/:userId", retrieveUserByIdController);

usersRoutes.patch(
  "/:userId",
  ensureIsValidDataMiddleware(userUpdateReqSchema),
  updateUserController
);

usersRoutes.post(
  "",
  ensureIsValidDataMiddleware(userReqSchema),
  ensureEmailExistsMiddleware,
  ensureUsernameExistsMiddleware,
  createUserController
);

usersRoutes.put("/:userId/activate", enableUserController);

export default usersRoutes;

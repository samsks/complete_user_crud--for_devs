import { Router } from "express";
import {
  ensureAuthMiddleware,
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

usersRoutes.delete("/:userId", ensureAuthMiddleware, deleteUserController);

usersRoutes.delete(
  "/:userId/deactivate",
  ensureAuthMiddleware,
  disableUserController
);

usersRoutes.get("", ensureAuthMiddleware, retrieveUsersController);

usersRoutes.get("/:userId", ensureAuthMiddleware, retrieveUserByIdController);

usersRoutes.patch(
  "/:userId",
  ensureAuthMiddleware,
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

usersRoutes.put(
  "/:userId/activate",
  ensureAuthMiddleware,
  enableUserController
);

export default usersRoutes;

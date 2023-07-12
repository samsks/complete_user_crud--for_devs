import { Router } from "express";
import {
  ensureAuthMiddleware,
  ensureEmailExistsMiddleware,
  ensureIsOwnerOrSuperuserMiddleware,
  ensureIsSuperuserMiddleware,
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
  ensureIsOwnerOrSuperuserMiddleware,
  disableUserController
);

usersRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsSuperuserMiddleware,
  retrieveUsersController
);

usersRoutes.get(
  "/:userId",
  ensureAuthMiddleware,
  ensureIsOwnerOrSuperuserMiddleware,
  retrieveUserByIdController
);

usersRoutes.patch(
  "/:userId",
  ensureAuthMiddleware,
  ensureIsOwnerOrSuperuserMiddleware,
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
  ensureIsOwnerOrSuperuserMiddleware,
  enableUserController
);

export default usersRoutes;

import { Router } from "express";
import {
  ensureAuthMiddleware,
  ensureEmailExistsMiddleware,
  ensureIsOwnerOrSuperuserMiddleware,
  ensureIsSuperuserMiddleware,
  ensureIsValidDataMiddleware,
  ensureUserIsActiveMiddleware,
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

usersRoutes.delete(
  "/:userId",
  ensureAuthMiddleware,
  ensureIsOwnerOrSuperuserMiddleware,
  ensureUserIsActiveMiddleware,
  deleteUserController
);

usersRoutes.delete(
  "/deactivate/:userId",
  ensureAuthMiddleware,
  ensureIsOwnerOrSuperuserMiddleware,
  ensureUserIsActiveMiddleware,
  disableUserController
);

usersRoutes.get(
  "",
  // ensureAuthMiddleware,
  // ensureIsSuperuserMiddleware,
  retrieveUsersController
);

usersRoutes.get(
  "/:userId",
  ensureAuthMiddleware,
  ensureIsOwnerOrSuperuserMiddleware,
  ensureUserIsActiveMiddleware,
  retrieveUserByIdController
);

usersRoutes.patch(
  "/:userId",
  ensureAuthMiddleware,
  ensureIsOwnerOrSuperuserMiddleware,
  ensureUserIsActiveMiddleware,
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

usersRoutes.put("/activate/:userId", enableUserController);

export default usersRoutes;

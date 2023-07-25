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
import multerPhotosPathConfig from "../configs/multerPhotosPath.config";

const usersRoutes: Router = Router();

usersRoutes.delete(
  "/:userId",
  ensureAuthMiddleware,
  ensureIsOwnerOrSuperuserMiddleware,
  deleteUserController
);

usersRoutes.delete(
  "/deactivate/:userId",
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
  ensureEmailExistsMiddleware,
  ensureUsernameExistsMiddleware,
  updateUserController
);

usersRoutes.post(
  "",
  multerPhotosPathConfig.single("avatar"),
  ensureIsValidDataMiddleware(userReqSchema),
  ensureEmailExistsMiddleware,
  ensureUsernameExistsMiddleware,
  createUserController
);

usersRoutes.put("/activate/:userId", enableUserController);

export default usersRoutes;

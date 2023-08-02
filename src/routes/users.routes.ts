import { Router } from "express";
import middlewares from "../middlewares";
import userSchemas from "../schemas/users.schema";
import controllers from "../controllers/users.controller";
import multerPhotosPathConfig from "../configs/multerPhotosPath.config";

const usersRoutes: Router = Router();

usersRoutes.delete(
  "/:userId",
  middlewares.ensureAuth,
  middlewares.ensureIsOwnerOrSuperuser,
  controllers.deleteUser
);

usersRoutes.delete(
  "/:userId/deactivate",
  middlewares.ensureAuth,
  middlewares.ensureIsOwnerOrSuperuser,
  controllers.disableUser
);

usersRoutes.get(
  "",
  middlewares.ensureAuth,
  middlewares.ensureIsSuperuser,
  middlewares.pagination("USERS_PER_PAGE"),
  controllers.retrieveUsers
);

usersRoutes.get(
  "/:userId",
  middlewares.ensureAuth,
  middlewares.ensureIsOwnerOrSuperuser,
  controllers.retrieveUserById
);

usersRoutes.patch(
  "/:userId",
  middlewares.ensureAuth,
  middlewares.ensureIsOwnerOrSuperuser,
  middlewares.ensureIsValidData(userSchemas.userUpdateReq),
  middlewares.uniqueUserFieldValidator("email"),
  middlewares.uniqueUserFieldValidator("username"),
  controllers.updateUser
);

usersRoutes.post(
  "",
  multerPhotosPathConfig.single("avatar"),
  middlewares.ensureIsValidData(userSchemas.userReq),
  middlewares.uniqueUserFieldValidator("email"),
  middlewares.uniqueUserFieldValidator("username"),
  controllers.createUser
);

usersRoutes.put("/:userId/activate", controllers.enableUser);

export default usersRoutes;

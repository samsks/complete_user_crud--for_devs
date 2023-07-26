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
  "/deactivate/:userId",
  middlewares.ensureAuth,
  middlewares.ensureIsOwnerOrSuperuser,
  controllers.disableUser
);

usersRoutes.get(
  "",
  middlewares.ensureAuth,
  middlewares.ensureIsSuperuser,
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
  middlewares.ensureEmailExists,
  middlewares.ensureUsernameExists,
  controllers.updateUser
);

usersRoutes.post(
  "",
  multerPhotosPathConfig.single("avatar"),
  middlewares.ensureIsValidData(userSchemas.userReq),
  middlewares.ensureEmailExists,
  middlewares.ensureUsernameExists,
  controllers.createUser
);

usersRoutes.put("/activate/:userId", controllers.enableUser);

export default usersRoutes;

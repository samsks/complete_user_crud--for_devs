import { Router } from "express";
import multerPhotosPathConfig from "../configs/multerPhotosPath.config";
import { changeAvatarController } from "../controllers/photos.controller";

const photosPathRouter: Router = Router();

photosPathRouter.put(
  "/avatar/:userId",
  multerPhotosPathConfig.single("avatar"),
  changeAvatarController
);

export default photosPathRouter;

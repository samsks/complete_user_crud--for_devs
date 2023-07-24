import multer, { Multer } from "multer";
import AppError from "../errors/AppError";
import path from "path";
import crypto from "crypto";
import { isValidFileExtension } from "../utils/schemaValidations/avatar.scripts";

const kb: number = 1024;

const multerPhotosPathConfig: Multer = multer({
  limits: { fileSize: 1024 * kb },
  fileFilter(req, file, callback): void {
    if (!isValidFileExtension(file.originalname))
      return callback(new AppError("Invalid file extension."));

    return callback(null, true);
  },
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.join(__dirname, "../../upload/avatars/"));
    },
    filename(req, file, callback) {
      const uuid: string = crypto.randomUUID();
      const extension: string = file.mimetype.split("/").at(-1)!;
      const photoName: string = `${Date.now()}-${uuid}.${extension}`;

      callback(null, photoName);
    },
  }),
});

export default multerPhotosPathConfig;

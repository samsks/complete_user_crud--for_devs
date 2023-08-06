import path from "path";
import fs from "fs";
import { iAvatarEntity } from "../../interfaces/photos.interface";
import AppDataSource from "../../data-source";
import Avatar from "../../entities/avatar.entity";
import { iUser } from "../../interfaces/users.interface";
import AppError from "../../errors/AppError";

const deleteAvatar = async (user: iUser): Promise<void> => {
  if (!user.avatar) throw new AppError("User does not have an avatar.", 404);

  const avatarFilePath: string = path.join(__dirname, user.avatar.path);
  fs.unlinkSync(avatarFilePath);

  const avatarRepository: iAvatarEntity = AppDataSource.getRepository(Avatar);
  await avatarRepository.remove(user.avatar);

  return;
};

export default deleteAvatar;

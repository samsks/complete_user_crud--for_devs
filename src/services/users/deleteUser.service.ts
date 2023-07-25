import { iUser, iUserEntity } from "../../interfaces/users.interface";
import Avatar from "../../entities/avatar.entity";
import AppDataSource from "../../data-source";
import path from "path";
import fs from "fs";
import { iAvatarEntity } from "../../interfaces/photos.interface";

const deleteUserService = async (
  userRepository: iUserEntity,
  user: iUser
): Promise<void> => {
  if (user.avatar) {
    const avatarFilePath: string = path.join(__dirname, user.avatar.path);
    fs.unlinkSync(avatarFilePath);

    const avatarRepository: iAvatarEntity = AppDataSource.getRepository(Avatar);
    await avatarRepository.remove(user.avatar);
  }

  await userRepository.remove(user);

  return;
};

export default deleteUserService;

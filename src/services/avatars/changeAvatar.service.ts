import path from "path";
import AppDataSource from "../../data-source";
import Avatar from "../../entities/avatar.entity";
import { iAvatar, iAvatarEntity } from "../../interfaces/photos.interface";
import { iUser } from "../../interfaces/users.interface";
import fs from "fs";

const changeAvatar = async (avatarFile: Express.Multer.File, user: iUser) => {
  const avatarRepository: iAvatarEntity = AppDataSource.getRepository(Avatar);

  if (user.avatar) {
    const avatarFilePath: string = path.join(__dirname, user.avatar.path);
    fs.unlinkSync(avatarFilePath);
  }

  const avatarNewData = {
    name: avatarFile.originalname,
    path: "../../../upload/avatars/" + avatarFile.filename,
  };

  const userAvatar: iAvatar = user.avatar
    ? avatarRepository.merge(user.avatar, avatarNewData)
    : avatarRepository.create({ ...avatarNewData, user });

  await avatarRepository.save(userAvatar);

  return userAvatar;
};

export default changeAvatar;

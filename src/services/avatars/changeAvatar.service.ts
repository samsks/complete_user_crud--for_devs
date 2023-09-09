import path from "path";
import { iAvatar, iAvatarResPath } from "../../interfaces/photos.interface";
import { iUser } from "../../interfaces/users.interface";
import fs from "fs";
import { avatarRepository } from "../../repositories";

const changeAvatar = async (
  avatarFile: Express.Multer.File,
  user: iUser
): Promise<iAvatarResPath> => {
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

  return {
    avatar: path.join(__dirname, userAvatar.path),
  } as iAvatarResPath;
};

export default changeAvatar;

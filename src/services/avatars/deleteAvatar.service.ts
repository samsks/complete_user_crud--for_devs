import path from "path";
import fs from "fs";
import { iUser } from "../../interfaces/users.interface";
import AppError from "../../errors/AppError";
import { avatarRepository } from "../../repositories";

const deleteAvatar = async (user: iUser): Promise<void> => {
  if (!user.avatar) throw new AppError("User does not have an avatar.", 404);

  const avatarFilePath: string = path.join(__dirname, user.avatar.path);
  fs.unlinkSync(avatarFilePath);

  await avatarRepository.remove(user.avatar);

  return;
};

export default deleteAvatar;

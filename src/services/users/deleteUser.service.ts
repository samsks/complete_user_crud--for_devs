import { iUser } from "../../interfaces/users.interface";
import path from "path";
import fs from "fs";
import { userRepository, avatarRepository } from "../../repositories";

const deleteUser = async (user: iUser): Promise<void> => {
  if (user.avatar) {
    const avatarFilePath: string = path.join(__dirname, user.avatar.path);
    fs.unlinkSync(avatarFilePath);

    await avatarRepository.remove(user.avatar);
  }

  await userRepository.remove(user);

  return;
};

export default deleteUser;

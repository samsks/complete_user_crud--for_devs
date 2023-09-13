import { iUser } from "../../interfaces/users.interface";
import { avatarRepository, userRepository } from "../../repositories";

const disableUser = async (user: iUser): Promise<void> => {
  if (user.avatar) {
    await avatarRepository.softDelete(user.avatar.id);
  }

  await userRepository.softDelete(user.id);
};

export default disableUser;

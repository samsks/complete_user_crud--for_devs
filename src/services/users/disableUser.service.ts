import AppDataSource from "../../data-source";
import Avatar from "../../entities/avatar.entity";
import { iAvatarEntity } from "../../interfaces/photos.interface";
import { iUser, iUserEntity } from "../../interfaces/users.interface";

const disableUser = async (
  userRepository: iUserEntity,
  user: iUser
): Promise<void> => {
  if (user.avatar) {
    const avatarRepository: iAvatarEntity = AppDataSource.getRepository(Avatar);
    await avatarRepository.softDelete(user.avatar.id);
  }

  await userRepository.softDelete(user.id);

  return;
};

export default disableUser;

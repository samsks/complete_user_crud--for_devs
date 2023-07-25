import AppDataSource from "../../data-source";
import Avatar from "../../entities/avatar.entity";
import { iUser, iUserEntity } from "../../interfaces/users.interface";

const disableUserService = async (
  userRepository: iUserEntity,
  user: iUser
): Promise<void> => {
  if (user.avatar) {
    const avatarRepository = AppDataSource.getRepository(Avatar);
    await avatarRepository.softDelete(user.avatar.id);
  }

  await userRepository.softDelete(user.id);

  return;
};

export default disableUserService;

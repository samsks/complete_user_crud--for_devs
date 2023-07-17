import { iUserEntity } from "../../interfaces/users.interface";

const disableUserService = async (
  userRepository: iUserEntity,
  userId: string
): Promise<void> => {
  await userRepository.softDelete(userId);

  return;
};

export default disableUserService;

import { iUser, iUserEntity } from "../../interfaces/users.interface";

const deleteUserService = async (
  userRepository: iUserEntity,
  user: iUser
): Promise<void> => {
  await userRepository.remove(user);

  return;
};

export default deleteUserService;

import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { iUserEntity } from "../../interfaces/users.interface";

const deleteUserService = async (
  // userRepository: iUserEntity,
  // user: iSuperuserRes
  userId: string
): Promise<void> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id: userId });

  await userRepository.remove(findUser!);

  return;
};

export default deleteUserService;

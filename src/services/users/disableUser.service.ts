import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { iUserEntity } from "../../interfaces/users.interface";

const disableUserService = async (userId: string): Promise<void> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  await userRepository.softDelete(userId);

  return;
};

export default disableUserService;

import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { iUserEntity, iUserRes } from "../../interfaces/users.interface";
import { userUpdateResSchema } from "../../schemas/users.schema";

const enableUserService = async (userId: string): Promise<iUserRes> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  await userRepository.restore(userId);

  const user = await userRepository.findOneBy({ id: userId });

  const { id, ...userData } = userUpdateResSchema.parse(user);

  const dataRes = {
    id: id,
    ...userData,
  };

  return dataRes;
};

export default enableUserService;

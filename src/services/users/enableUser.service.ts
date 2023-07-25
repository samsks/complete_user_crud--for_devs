import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { iUser, iUserEntity, iUserRes } from "../../interfaces/users.interface";
import { userUpdateResSchema } from "../../schemas/users.schema";

const enableUserService = async (userId: string): Promise<iUserRes> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  await userRepository.restore(userId);

  const user: iUser | null = await userRepository.findOneBy({ id: userId });

  const { id, ...userData }: iUserRes = userUpdateResSchema.parse(user);

  const dataRes: iUserRes = {
    id: id,
    ...userData,
  };

  return dataRes as iUserRes;
};

export default enableUserService;

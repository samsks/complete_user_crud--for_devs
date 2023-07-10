import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import {
  iUserEntity,
  iUserUpdateReq,
  iUserUpdateRes,
} from "../../interfaces/users.interface";
import { userUpdateResSchema } from "../../schemas/users.schema";

const updateUserService = async (
  userId: string,
  userDataUpdate: iUserUpdateReq
): Promise<iUserUpdateRes> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  const userUpdated = userRepository.create(userDataUpdate);

  await userRepository.update(userId, userUpdated);

  const findUser = await userRepository.findOneBy({ id: userId });

  const { id, ...user } = userUpdateResSchema.parse(findUser);

  const dataUser = {
    id: id,
    ...user,
  };

  return dataUser as iUserUpdateRes;
};

export default updateUserService;

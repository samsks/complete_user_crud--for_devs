import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import {
  iUserEntity,
  iUserReq,
  iUserRes,
} from "../../interfaces/users.interface";
import { hash } from "bcryptjs";
import { userResSchema } from "../../schemas/users.schema";

const createUserService = async (newUserData: iUserReq): Promise<iUserRes> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  const { password, ...userData } = newUserData;

  const user = userRepository.create({
    ...userData,
    password: await hash(password, 10),
  });

  const userPersisted = await userRepository.save(user);

  const { id, ...newUser } = userResSchema.parse(userPersisted);

  const dataRes = {
    id: id,
    ...newUser,
  };

  return dataRes as iUserRes;
};

export default createUserService;

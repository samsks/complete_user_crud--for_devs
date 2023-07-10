import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { iUserEntity, iUserRes } from "../../interfaces/users.interface";
import { userResSchema } from "../../schemas/users.schema";

const retrieveUserByIdService = async (userId: string): Promise<iUserRes> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id: userId });

  const { id, ...user } = userResSchema.parse(findUser);

  const dataUser = {
    id: id,
    ...user,
  };

  return dataUser as iUserRes;
};

export default retrieveUserByIdService;

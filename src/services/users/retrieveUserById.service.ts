import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { iUserRes } from "../../interfaces/users.interface";
import { userResSchema } from "../../schemas/users.schema";

const retrieveUserByIdService = async (userId: string): Promise<iUserRes> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id: userId });

  const { id, ...user } = userResSchema.parse(findUser);

  const dataUser = {
    id: id,
    ...user,
  };

  return dataUser as iUserRes;
};

export default retrieveUserByIdService;

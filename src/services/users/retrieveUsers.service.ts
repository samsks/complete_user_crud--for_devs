import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import {
  iSuperuserRes,
  iUser,
  iUserEntity,
  iUserRes,
} from "../../interfaces/users.interface";
import { superuserResSchema } from "../../schemas/users.schema";

const retrieveUsersService = async (): Promise<iSuperuserRes[]> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  const findUsers: iUser[] = await userRepository.find({ withDeleted: true });

  const usersList: iUser[] = findUsers.map((user, i) => {
    const { id, ...userData }: iUserRes = superuserResSchema.parse(user);
    const dataUser: iUserRes = {
      id,
      ...userData,
    };
    return dataUser as iUser;
  });

  return usersList as iSuperuserRes[];
};

export default retrieveUsersService;

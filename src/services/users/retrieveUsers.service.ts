import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import {
  iSuperuserRes,
  iUser,
  iUserEntity,
  iUserRes,
} from "../../interfaces/users.interface";
import userSchemas from "../../schemas/users.schema";

const retrieveUsersService = async (): Promise<iSuperuserRes[]> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  const findUsers: Array<iUser> = await userRepository.find({
    withDeleted: true,
  });

  const usersList: Array<iUser> = findUsers.map((user, i) => {
    const { id, ...userData }: iUserRes = userSchemas.superuserRes.parse(user);
    const dataUser: iUserRes = {
      id,
      ...userData,
    };
    return dataUser as iUser;
  });

  return usersList as Array<iSuperuserRes>;
};

export default retrieveUsersService;

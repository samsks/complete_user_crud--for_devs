import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { iSuperuserRes, iUserEntity } from "../../interfaces/users.interface";
import { superuserResSchema } from "../../schemas/users.schema";

const retrieveUsersService = async (): Promise<iSuperuserRes[]> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  const findUsers = await userRepository.find({ withDeleted: true });

  const usersList = findUsers.map((user, i) => {
    const { id, ...userData } = superuserResSchema.parse(user);
    const dataUser = {
      id,
      ...userData,
    };
    return dataUser;
  });

  return usersList as iSuperuserRes[];
};

export default retrieveUsersService;

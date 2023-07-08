import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { iUserReq, iUserRes } from "../../interfaces/users.interface";
import { hash } from "bcryptjs";
import { userResSchema } from "../../schemas/users.schema";

const createUserService = async (newUserData: iUserReq): Promise<iUserRes> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const { password, ...userData } = newUserData;

  const user = userRepository.create({
    ...userData,
    password: await hash(password, 10),
  });

  const userPersisted = await userRepository.save(user);

  const newUser = userResSchema.parse(userPersisted);

  return newUser as iUserRes;
};

export default createUserService;

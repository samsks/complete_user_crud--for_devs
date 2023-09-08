import { iUser, iUserRes } from "../../interfaces/users.interface";
import { userRepository } from "../../repositories";
import userSchemas from "../../schemas/users.schema";

const enableUser = async (userId: string): Promise<iUserRes> => {
  await userRepository.restore(userId);

  const user: iUser | null = await userRepository.findOneBy({ id: userId });

  const { id, ...userData }: iUserRes = userSchemas.userUpdateRes.parse(user);

  const dataRes: iUserRes = {
    id: id,
    ...userData,
  };

  return dataRes as iUserRes;
};

export default enableUser;

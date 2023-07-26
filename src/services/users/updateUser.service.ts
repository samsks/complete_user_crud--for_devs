import { hash } from "bcryptjs";
import {
  iUser,
  iUserEntity,
  iUserRes,
  iUserUpdateReq,
  iUserUpdateRes,
} from "../../interfaces/users.interface";
import userSchema from "../../schemas/users.schema";

const updateUserService = async (
  userRepository: iUserEntity,
  user: iUser,
  bodyData: iUserUpdateReq
): Promise<iUserUpdateRes> => {
  const userUpdated: iUser = userRepository.create(bodyData);

  if (userUpdated.password)
    userUpdated.password = await hash(userUpdated.password, 10);

  await userRepository.update(user.id, userUpdated);

  const { id, avatar, ...userData }: iUserUpdateRes =
    userSchema.userUpdateRes.parse(user);

  const dataUser: iUserRes = {
    id: id,
    ...userData,
  };

  return dataUser as iUserUpdateRes;
};

export default updateUserService;

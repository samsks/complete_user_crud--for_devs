import path from "path";
import {
  iUser,
  iUserResLocals,
  iUserResWithAvatar,
} from "../../interfaces/users.interface";
import userSchemas from "../../schemas/users.schema";

const retrieveUserByIdService = async (
  user: iUser
): Promise<iUserResWithAvatar> => {
  const { id, ...userData }: iUserResLocals = userSchemas.userRes.parse(user);

  return {
    id,
    ...userData,
    avatar: user.avatar ? path.join(__dirname, user.avatar.path) : null,
  } as iUserResWithAvatar;
};

export default retrieveUserByIdService;

import { iUser, iUserRes } from "../../interfaces/users.interface";
import { userResSchema } from "../../schemas/users.schema";

const retrieveUserByIdService = async (user: iUser): Promise<iUserRes> => {
  const { id, ...userData } = userResSchema.parse(user);

  const dataUser = {
    id: id,
    ...userData,
  };

  return dataUser as iUserRes;
};

export default retrieveUserByIdService;

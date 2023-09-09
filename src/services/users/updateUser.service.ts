import { hash } from "bcryptjs";
import {
  iUser,
  iUserUpdateReq,
  iUserUpdateRes,
} from "../../interfaces/users.interface";
import userSchema from "../../schemas/users.schema";
import { userRepository } from "../../repositories";

const updateUserService = async (
  user: iUser,
  bodyData: iUserUpdateReq
): Promise<iUserUpdateRes> => {
  const userPayload: iUser = userRepository.create(bodyData);

  if (userPayload.password)
    userPayload.password = await hash(userPayload.password, 10);

  const userUpdated = await userRepository
    .createQueryBuilder()
    .update()
    .set(userPayload)
    .where("id = :id", { id: user.id })
    .returning("*")
    .execute();

  const rawUser = userUpdated.raw[0];

  if (rawUser.birthday instanceof Date) {
    rawUser.birthday = rawUser.birthday.toISOString().split("T")[0];
  }

  const { id, ...userData }: iUserUpdateRes =
    userSchema.userUpdateRes.parse(rawUser);

  return {
    id: id,
    ...userData,
  } as iUserUpdateRes;
};

export default updateUserService;

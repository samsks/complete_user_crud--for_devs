import path from "path";
import { PaginationParams } from "../../interfaces/pagination.interface";
import {
  iSuperuserPagRes,
  iUser,
  iUserResLocals,
  iUserResWithAvatar,
} from "../../interfaces/users.interface";
import { userRepository } from "../../repositories";
import userSchemas from "../../schemas/users.schema";

const retrieveUsersService = async ({
  page,
  perPage,
  prevPage,
  nextPage,
}: PaginationParams): Promise<iSuperuserPagRes> => {
  const [foundUsers, count]: [Array<iUser>, number] =
    await userRepository.findAndCount({
      withDeleted: true,
      relations: ["avatar"],
      skip: page,
      take: perPage,
    });

  const usersList: Array<iUserResWithAvatar> = foundUsers.map((user) => {
    const { id, ...userData }: iUserResLocals =
      userSchemas.superuserRes.parse(user);

    return {
      id,
      ...userData,
      avatar: userData.avatar
        ? path.join(__dirname, userData.avatar.path)
        : null,
    } as iUserResWithAvatar;
  });

  return {
    prevPage: page <= 1 ? null : prevPage,
    nextPage: count - page <= perPage ? null : nextPage,
    count,
    data: usersList,
  } as iSuperuserPagRes;
};

export default retrieveUsersService;

import { PaginationParams } from "../../interfaces/pagination.interface";
import {
  iSuperuserPagRes,
  iUser,
  iUserRes,
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
      skip: page,
      take: perPage,
    });

  const usersList: Array<iUser> = foundUsers.map((user) => {
    const { id, ...userData }: iUserRes = userSchemas.superuserRes.parse(user);
    const dataUser: iUserRes = {
      id,
      ...userData,
    };
    return dataUser as iUser;
  });

  return {
    prevPage: page <= 1 ? null : prevPage,
    nextPage: count - page <= perPage ? null : nextPage,
    count,
    data: usersList,
  } as iSuperuserPagRes;
};

export default retrieveUsersService;

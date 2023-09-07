import { z } from "zod";
import User from "../entities/user.entity";
import { DeepPartial, Repository } from "typeorm";
import userSchemas from "../schemas/users.schema";

type iUser = User;

type iUserReq = z.infer<typeof userSchemas.userReq>;
type iUserRes = z.infer<typeof userSchemas.userRes>;
type iUserUpdateReq = DeepPartial<iUserReq>;
type iUserUpdateRes = z.infer<typeof userSchemas.userUpdateRes>;
type iSuperuserRes = z.infer<typeof userSchemas.superuserRes>;
type iSuperuserPagRes = z.infer<typeof userSchemas.superuserPagRes>;
type iUserLocals = z.infer<typeof userSchemas.userReqLocals>;

export {
  iUser,
  iUserReq,
  iUserRes,
  iUserUpdateReq,
  iUserUpdateRes,
  iSuperuserRes,
  iSuperuserPagRes,
  iUserLocals,
};

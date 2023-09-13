import { z } from "zod";
import User from "../entities/user.entity";
import { DeepPartial } from "typeorm";
import userSchemas from "../schemas/users.schema";

type iUser = User;

type iUserReq = z.infer<typeof userSchemas.userReq>;
type iUserRes = z.infer<typeof userSchemas.userRes>;
type iUserResLocals = z.infer<typeof userSchemas.userResLocals>;
type iUserResWithAvatar = z.infer<typeof userSchemas.userResWithAvatar>;
type iUserUpdateReq = DeepPartial<iUserReq>;
type iUserUpdateRes = z.infer<typeof userSchemas.userUpdateRes>;
type iSuperuserRes = z.infer<typeof userSchemas.superuserRes>;
type iSuperuserPagRes = z.infer<typeof userSchemas.superuserPagRes>;

export {
  iUser,
  iUserReq,
  iUserRes,
  iUserResLocals,
  iUserResWithAvatar,
  iUserUpdateReq,
  iUserUpdateRes,
  iSuperuserRes,
  iSuperuserPagRes,
};

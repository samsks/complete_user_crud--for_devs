import { z } from "zod";
import User from "../entities/user.entity";
import { DeepPartial, Repository } from "typeorm";
import {
  superuserResSchema,
  userReqLocalsSchema,
  userReqSchema,
  userResSchema,
  userUpdateResSchema,
} from "../schemas/users.schema";

type iUserEntity = Repository<User>;
type iUser = User;

type iUserReq = z.infer<typeof userReqSchema>;
type iUserRes = z.infer<typeof userResSchema>;
type iUserUpdateReq = DeepPartial<iUserReq>;
type iUserUpdateRes = z.infer<typeof userUpdateResSchema>;
type iSuperuserRes = z.infer<typeof superuserResSchema>;
type iUserLocals = z.infer<typeof userReqLocalsSchema>;

export {
  iUser,
  iUserEntity,
  iUserReq,
  iUserRes,
  iUserUpdateReq,
  iUserUpdateRes,
  iSuperuserRes,
  iUserLocals,
};

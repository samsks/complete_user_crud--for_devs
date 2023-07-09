import { z } from "zod";
import User from "../entities/user.entity";
import { Repository } from "typeorm";
import {
  superuserResSchema,
  userReqSchema,
  userResSchema,
} from "../schemas/users.schema";

type iUserEntity = Repository<User>;

type iUserReq = z.infer<typeof userReqSchema>;
type iUserRes = z.infer<typeof userResSchema>;
type iSuperuserRes = z.infer<typeof superuserResSchema>;

export { iUserEntity, iUserReq, iUserRes, iSuperuserRes };

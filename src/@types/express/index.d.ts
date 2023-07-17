import { Request } from "express";
import {
  iSuperuserRes,
  iUser,
  iUserEntity,
  iUserLocals,
} from "../../interfaces/users.interface";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        is_superuser: boolean;
      };
      locals?: {
        user?: iUser;
        userRepository?: iUserEntity;
      };
      pagination: {
        limit: number;
        offset: number;
      };
    }
  }
}

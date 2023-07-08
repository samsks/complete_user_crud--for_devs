import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        is_superuser: boolean;
      };
      pagination: {
        limit: number;
        offset: number;
      };
    }
  }
}

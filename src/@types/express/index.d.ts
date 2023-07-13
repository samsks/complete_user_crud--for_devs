import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        is_superuser: boolean;
      };
      locals?: {
        user: {
          id: string;
          username: string;
          email: string;
          password: string;
          profile_image: string | null | undefined;
          first_name: string;
          middle_name: string | null | undefined;
          last_name: string;
          phone_number: string;
          birthday: string;
          is_superuser: boolean;
          reset_token: string | null;
          created_at: date;
          updated_at: date;
          deleted_at: date | null;
        };
      };
      pagination: {
        limit: number;
        offset: number;
      };
    }
  }
}

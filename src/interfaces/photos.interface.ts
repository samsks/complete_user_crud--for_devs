import { z } from "zod";
import { Repository } from "typeorm";
import Avatar from "../entities/avatar.entity";
import { avatarReqSchema, avatarResSchema } from "../schemas/photos.schemas";

type iAvatarEntity = Repository<Avatar>;
type iAvatar = Avatar;

type iAvatarReq = z.infer<typeof avatarReqSchema>;
type iAvatarRes = z.infer<typeof avatarResSchema>;

export { iAvatar, iAvatarEntity, iAvatarReq, iAvatarRes };

import { z } from "zod";
import { Repository } from "typeorm";
import Avatar from "../entities/avatar.entity";
import avatarSchemas from "../schemas/photos.schemas";

type iAvatarEntity = Repository<Avatar>;
type iAvatar = Avatar;

type iAvatarReq = z.infer<typeof avatarSchemas.avatarReq>;
type iAvatarRes = z.infer<typeof avatarSchemas.avatarRes>;
type iAvatarResPath = z.infer<typeof avatarSchemas.avatarResUser>;

export { iAvatar, iAvatarEntity, iAvatarReq, iAvatarRes, iAvatarResPath };

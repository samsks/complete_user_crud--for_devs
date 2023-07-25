import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import {
  iUser,
  iUserEntity,
  iUserReq,
  iUserRes,
} from "../../interfaces/users.interface";
import { hash } from "bcryptjs";
import { userResSchema } from "../../schemas/users.schema";
import Avatar from "../../entities/avatar.entity";
import path from "path";
import { iAvatar, iAvatarEntity } from "../../interfaces/photos.interface";

const createUserService = async (
  newUserData: iUserReq,
  avatarFile?: Express.Multer.File
): Promise<iUserRes> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);

  const { password, ...userData }: iUserReq = newUserData;

  const user: iUser = userRepository.create({
    ...userData,
    password: await hash(password, 10),
  });

  const userPersisted: iUser = await userRepository.save(user);

  let userAvatar: iAvatar | null = null;

  if (avatarFile) {
    const avatarRepository: iAvatarEntity = AppDataSource.getRepository(Avatar);

    const userAvatarEntity: iAvatar = avatarRepository.create({
      name: avatarFile.originalname,
      path: "../../../upload/avatars/" + avatarFile.filename,
      user: userPersisted,
    });
    await avatarRepository.save(userAvatarEntity);
    userAvatar = userAvatarEntity;
  }

  const { id, ...newUser }: iUserRes = userResSchema.parse(userPersisted);

  const dataRes: iUserRes = {
    id: id,
    ...newUser,
    avatar: avatarFile ? path.join(__dirname, userAvatar?.path!) : null,
  };

  return dataRes as iUserRes;
};

export default createUserService;

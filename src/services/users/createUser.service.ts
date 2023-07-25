import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import {
  iUserEntity,
  iUserReq,
  iUserRes,
} from "../../interfaces/users.interface";
import { hash } from "bcryptjs";
import { userResSchema } from "../../schemas/users.schema";
import Avatar from "../../entities/avatar.entity";
import path from "path";

const createUserService = async (
  newUserData: iUserReq,
  avatarFile?: Express.Multer.File
): Promise<iUserRes> => {
  const userRepository: iUserEntity = AppDataSource.getRepository(User);
  const avatarRepository = AppDataSource.getRepository(Avatar);

  const { password, ...userData } = newUserData;

  const user = userRepository.create({
    ...userData,
    password: await hash(password, 10),
  });

  const userPersisted = await userRepository.save(user);

  let userAvatar: Avatar | null = null;

  if (avatarFile) {
    const userAvatarEntity = avatarRepository.create({
      name: avatarFile.originalname,
      path: "../../../upload/avatars/" + avatarFile.filename,
      user: userPersisted,
    });
    await avatarRepository.save(userAvatarEntity);
    userAvatar = userAvatarEntity;
  }

  const { id, ...newUser } = userResSchema.parse(userPersisted);

  const dataRes = {
    id: id,
    ...newUser,
    avatar: avatarFile ? path.join(__dirname, userAvatar?.path!) : null,
  };

  return dataRes as iUserRes;
};

export default createUserService;

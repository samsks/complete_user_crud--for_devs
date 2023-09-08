import { iUser, iUserReq, iUserRes } from "../../interfaces/users.interface";
import { hash } from "bcryptjs";
import userSchemas from "../../schemas/users.schema";
import path from "path";
import { iAvatar } from "../../interfaces/photos.interface";
import { avatarRepository, userRepository } from "../../repositories";

const createUser = async (
  newUserData: iUserReq,
  avatarFile?: Express.Multer.File
): Promise<iUserRes> => {
  const { password, ...userData }: iUserReq = newUserData;

  const user: iUser = userRepository.create({
    ...userData,
    password: await hash(password, 10),
  });

  const userPersisted: iUser = await userRepository.save(user);

  let userAvatar: iAvatar | null = null;

  if (avatarFile) {
    const userAvatarEntity: iAvatar = avatarRepository.create({
      name: avatarFile.originalname,
      path: "../../../upload/avatars/" + avatarFile.filename,
      user: userPersisted,
    });
    await avatarRepository.save(userAvatarEntity);
    userAvatar = userAvatarEntity;
  }

  const { id, ...newUser }: iUserRes = userSchemas.userRes.parse(userPersisted);

  const dataRes: iUserRes = {
    id: id,
    ...newUser,
    avatar: avatarFile ? path.join(__dirname, userAvatar?.path!) : null,
  };

  return dataRes as iUserRes;
};

export default createUser;

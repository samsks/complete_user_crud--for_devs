import path from "path";
import {
  iUser,
  iUserRes,
  iUserResLocals,
  iUserResWithAvatar,
} from "../../interfaces/users.interface";
import { avatarRepository, userRepository } from "../../repositories";
import userSchemas from "../../schemas/users.schema";
import AppError from "../../errors/AppError";

const enableUser = async (userId: string): Promise<iUserRes> => {
  const user: iUser | null = await userRepository.findOne({
    where: { id: userId },
    relations: ["avatar"],
    withDeleted: true,
  });
  // precisa verificar uuid valido e demais verificações de seguranã com middleware e código de ativação
  if (!user) throw new AppError("User not found", 404);
  if (user.deleted_at === null) throw new AppError("User already enabled", 401);

  await userRepository.restore(userId);

  if (user.avatar) await avatarRepository.restore(user.avatar.id);

  const userRestored: iUser | null = await userRepository.findOne({
    where: { id: userId },
    relations: ["avatar"],
  });

  const { id, ...userData }: iUserResLocals =
    userSchemas.userResLocals.parse(userRestored);

  return {
    id: id,
    ...userData,
    avatar: userData.avatar ? path.join(__dirname, userData.avatar.path) : null,
  } as iUserResWithAvatar;
};

export default enableUser;

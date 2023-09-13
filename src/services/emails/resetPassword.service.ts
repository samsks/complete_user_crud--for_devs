import { verify } from "jsonwebtoken";
import { userRepository } from "../../repositories";
import AppError from "../../errors/AppError";
import { hashSync } from "bcryptjs";
import "dotenv/config";

const resetPassword = async (
  newPassword: string,
  resetToken: string
): Promise<void> => {
  const { sub: userId } = verify(
    resetToken,
    process.env.RESET_PASSWORD_SECRET_KEY!
  );

  const user = await userRepository.findOne({
    where: {
      reset_token: resetToken,
      id: userId as string,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const hashedPass = hashSync(newPassword, Number(process.env.SALT_HASH));

  await userRepository.update(
    {
      reset_token: resetToken,
      id: userId as string,
    },
    {
      password: hashedPass,
      reset_token: null,
    }
  );
};

export default resetPassword;

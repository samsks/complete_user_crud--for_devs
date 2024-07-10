import { randomUUID } from "crypto";
import AppError from "../../errors/AppError";
import { userRepository } from "../../repositories";
import mailer from "../../utils/nodemailer";
import { sign } from "jsonwebtoken";
import "dotenv/config";

const resetPasswordSendMail = async (
  email: string,
  protocol: string,
  host: string
) => {
  const user = await userRepository.findOneBy({
    email,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const resetToken: string = sign(
    { subject: user.id },
    process.env.RESET_PASSWORD_SECRET_KEY as string,
    {
      expiresIn: process.env.RESET_PASSWORD_EXPIRATION_TIME ?? "1h",
    }
  );

  // const resetToken = randomUUID();

  await userRepository.update(
    {
      email: user.email,
    },
    {
      reset_token: resetToken,
    }
  );

  const templateResetPassword = mailer.passRecoveryTemplate({
    userEmail: user.email,
    userName: user.first_name,
    protocol,
    host,
    resetToken,
  });

  await mailer.sendMailConfig(templateResetPassword);
};

export default resetPasswordSendMail;

import { createTransport } from "nodemailer";
import {
  iMailConfig,
  iMailPassRecovery,
} from "../../interfaces/email.interface";
import "dotenv/config";
import Mailgen from "mailgen";

const sendMailConfig = async ({ to, subject, text }: iMailConfig) => {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    // port: Number(process.env.SMTP_PORT),
    // secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html: text,
    })
    .then((info) => {
      console.log(info);
    })
    .catch((err) => {
      console.log(err);
    });
};

const passRecoveryTemplate = ({
  userEmail,
  userName,
  protocol,
  host,
  resetToken,
}: iMailPassRecovery) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Recuperação de senha.",
      link: `${protocol}://${host}`,
    },
  });

  const email = {
    body: {
      name: userName,
      intro: "Recuperação de senha.",
      action: {
        instructions: "Clique aqui para resetar sua senha.",
        button: {
          color: "#DC4D2F",
          text: "Resetar senha",
          link: `${protocol}://${host}/users/${resetToken}/resetPassword`,
        },
      },
    },
  };

  const emailBody = mailGenerator.generate(email);

  const emailTemplate = {
    to: userEmail,
    subject: "Reset de senha.",
    text: emailBody,
  };

  return emailTemplate;
};

export { sendMailConfig, passRecoveryTemplate };

import { createTransport } from "nodemailer";
import { iEmailReq } from "../../interfaces/email.interface";
import "dotenv/config";

const sendEmail = async ({ to, subject, text }: iEmailReq) => {
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

export default sendEmail;

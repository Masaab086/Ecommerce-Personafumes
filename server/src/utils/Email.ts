import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sendEmail = (receiver: any, subject: any, html: any) => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: receiver,
    subject: subject,
    html: "" + html + "",
  };

  console.log(mailOptions);
  transporter.sendMail(mailOptions, (err: any) => {
    if (err) {
      console.log(err);
    }
  });
};

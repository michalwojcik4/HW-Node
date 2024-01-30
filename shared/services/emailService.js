import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: "postmaster@sandboxb714d8c4f77047a3980e9639fc1b71e2.mailgun.org",
    pass: process.env.MAILGUN_API_KEY,
  },
};

const transporter = nodemailer.createTransport(config);

export { transporter };

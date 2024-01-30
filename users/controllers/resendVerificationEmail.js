import { User } from "../user.schema.js";
import { transporter } from "../../shared/services/emailService.js";

const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const verificationLink = `http://localhost:3000/users/verify/${user.verificationToken}`;

    const emailOptions = {
      from: "no-reply@sandboxb714d8c4f77047a3980e9639fc1b71e2.mailgun.org",
      to: email,
      subject: "Account Verification",
      html: `<p>Click the following link to verify your account:</p>
            <a href="${verificationLink}">${verificationLink}</a>`,
    };

    await transporter.sendMail(emailOptions);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export { resendVerificationEmail };

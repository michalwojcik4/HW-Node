import { User } from "../user.schema.js";
import { transporter } from "../../shared/services/emailService.js";
import { getEmailOptions } from "../../shared/services/emailOptions.js";

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

    const emailOptions = getEmailOptions(email, verificationToken);

    await transporter.sendMail(emailOptions);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

export { resendVerificationEmail };

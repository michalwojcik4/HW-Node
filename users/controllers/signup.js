import bcrypt from "bcryptjs";
import { User } from "../user.schema.js";
import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";
import { transporter } from "../../shared/services/emailService.js";
import { getEmailOptions } from "../../shared/services/emailOptions.js";

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: "250", r: "g", d: "identicon" });
    const verificationToken = uuidv4();

    const emailOptions = getEmailOptions(email, verificationToken);

    await transporter.sendMail(emailOptions);

    const user = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    return res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
        avatar: user.avatarURL,
        verificationToken: user.verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { signup };

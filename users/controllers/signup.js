import bcrypt from "bcryptjs";
import { User } from "../user.schema.js";
import gravatar from "gravatar";

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: "250", r: "g", d: "identicon" });
    const user = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    return res
      .status(201)
      .json({
        user: {
          email: user.email,
          subscription: user.subscription,
          avatar: user.avatarURL,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return next(error);
  }
};

export { signup };

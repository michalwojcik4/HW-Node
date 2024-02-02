import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../user.schema.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user || !passwordMatch || !user.verify) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();

    return res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

export { login };

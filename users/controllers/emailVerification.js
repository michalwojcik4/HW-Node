import { User } from "../user.schema.js";

const verifyUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verificationToken = null;
    user.verify = true;

    await user.save();

    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

export { verifyUser };

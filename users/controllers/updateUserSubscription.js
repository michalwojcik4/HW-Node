import { User } from "../user.schema.js";

const updateUserSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedUser = await User.findOneAndUpdate(
      user._id,
      { $set: { subscription } },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export { updateUserSubscription };

import fs from "fs";
import path from "path";
import jimp from "jimp";

const storeImage = path.join(process.cwd(), "public/avatars");

const updateUserAvatar = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { path: tmpPath } = req.file;
    const newFileName = `${user._id}_avatar.jpg`;
    const fileName = path.join(storeImage, newFileName);

    const image = await jimp.read(tmpPath);
    await image.resize(250, 250).write(fileName);

    fs.unlinkSync(tmpPath);

    user.avatarURL = `/avatars/${newFileName}`;
    await user.save();

    return res.status(200).json({
      user: {
        email: user.email,
        avatar: user.avatarURL,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export { updateUserAvatar, storeImage };

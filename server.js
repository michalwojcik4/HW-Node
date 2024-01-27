import app from "./app.js";
import { uploadDir } from "./middleware/uploadAvatar.js";
import { storeImage } from "./users/controllers/updateUserAvatar.js";
import { createFolderIsNotExist } from "./createFolderIsNotExist.js";

app.listen(3000, () => {
  createFolderIsNotExist(uploadDir);
  createFolderIsNotExist(storeImage);
  console.log("Server running. Use our API on port: 3000");
});

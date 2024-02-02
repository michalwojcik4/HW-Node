import express from "express";
import { signup } from "./controllers/signup.js";
import { login } from "./controllers/login.js";
import { logout } from "./controllers/logout.js";
import { current } from "./controllers/current.js";
import { updateUserSubscription } from "./controllers/updateUserSubscription.js";
import { updateUserAvatar } from "./controllers/updateUserAvatar.js";
import { verifyUser } from "./controllers/emailVerification.js";

import { bodyValidate } from "../middleware/validate.js";
import { auth } from "./middleware/authenticate.js";
import { validatorUser, validatorEmail } from "./user.validator.js";
import { uploadAvatar } from "../middleware/uploadAvatar.js";
import { resendVerificationEmail } from "./controllers/resendVerificationEmail.js";

const router = express.Router();

router.post("/signup", bodyValidate(validatorUser), signup);
router.post("/login", bodyValidate(validatorUser), login);
router.get("/logout", auth, logout);
router.get("/current", auth, current);
router.patch("/", auth, updateUserSubscription);
router.patch("/avatars", auth, uploadAvatar.single("avatar"), updateUserAvatar);
router.patch("/verify/:verificationToken", verifyUser);
router.post("/verify", bodyValidate(validatorEmail), resendVerificationEmail);

export default router;

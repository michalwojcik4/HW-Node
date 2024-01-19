import express from "express";
import { signup } from "./controllers/signup.js";
import { login } from "./controllers/login.js";
import { logout } from "./controllers/logout.js";
import { current } from "./controllers/current.js";
import { auth } from "./middleware/authenticate.js";
import { updateUserSubscription } from "./controllers/updateUserSubscription.js";

import { bodyValidate } from "../middleware/Validate.js";
import { validatorUser } from "./user.validator.js";

const router = express.Router();

router.post("/signup", bodyValidate(validatorUser), signup);
router.post("/login", bodyValidate(validatorUser), login);
router.get("/logout", auth, logout);
router.get("/current", auth, current);
router.patch("/", auth, updateUserSubscription);

export default router;

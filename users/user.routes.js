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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email address of the user.
 *         password:
 *           type: string
 *           description: User password.
 *         subscription:
 *           type: string
 *           enum: ["starter", "pro", "business"]
 *           default: "starter"
 *           description: User subscription level.
 *         token:
 *           type: string
 *           default: null
 *           description: Authentication token for the user.
 *         avatarURL:
 *           type: string
 *           description: URL of the user's avatar.
 *       required:
 *         - email
 *         - password
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: User registration
 *     description: Register a new user and send a verification email.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 email: user@example.com
 *                 subscription: free
 *                 avatar: [avatarURL]
 *                 verificationToken: [verificationToken]
 *       409:
 *         description: User with this email already exists
 *         content:
 *           application/json:
 *             example:
 *               message: User with this email already exists
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post("/signup", bodyValidate(validatorUser), signup);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user.
 *     description: Log in a user with the provided email and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: User's password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login. Returns an authentication token and user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token.
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: User's email address.
 *                     subscription:
 *                       type: string
 *                       description: User's subscription type.
 *       401:
 *         description: Invalid credentials or unverified email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Internal Server Error message.
 */
router.post("/login", bodyValidate(validatorUser), login);

/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Logout user
 *     description: Logout the currently authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User logged out successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/logout", auth, logout);

/**
 * @swagger
 * /users/current:
 *   get:
 *     summary: Get current user
 *     description: Get information about the currently authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 subscription:
 *                   type: string
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/current", auth, current);

/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Update user subscription
 *     description: Update the subscription level of the currently authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscription:
 *                 type: string
 *                 enum: ["starter", "pro", "business"]
 *             required:
 *               - subscription
 *     responses:
 *       200:
 *         description: User subscription updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal Server Error
 */
router.patch("/", auth, updateUserSubscription);

/**
 * @swagger
 * /users/avatars:
 *   patch:
 *     summary: Update user avatar
 *     description: Update the avatar of the currently authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                       format: uri
 *       401:
 *         description: Not authorized
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Internal Server Error
 */
router.patch("/avatars", auth, uploadAvatar.single("avatar"), updateUserAvatar);

/**
 * @swagger
 * /users/verify/{verificationToken}:
 *   patch:
 *     summary: Verify user by token
 *     description: Verify a user's email using the provided verification token.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: verificationToken
 *         required: true
 *         description: User verification token received via email.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Verification successful
 *         content:
 *           application/json:
 *             example:
 *               message: Verification successful
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.patch("/verify/:verificationToken", verifyUser);

/**
 * @swagger
 * /users/verify:
 *   post:
 *     summary: Resend verification email
 *     description: Resend the verification email to the user with the provided email.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Verification email sent
 *         content:
 *           application/json:
 *             example:
 *               message: Verification email sent
 *       400:
 *         description: Verification has already been passed or missing required field email
 *         content:
 *           application/json:
 *             example:
 *               message: Verification has already been passed
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
router.post("/verify", bodyValidate(validatorEmail), resendVerificationEmail);

export default router;

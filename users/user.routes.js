import express from "express";
import { signup } from "./controllers/signup.js";
import { login } from "./controllers/login.js";
import { logout } from "./controllers/logout.js";
import { current } from "./controllers/current.js";
import { updateUserSubscription } from "./controllers/updateUserSubscription.js";
import { updateUserAvatar } from "./controllers/updateUserAvatar.js";

import { bodyValidate } from "../middleware/Validate.js";
import { auth } from "./middleware/authenticate.js";
import { validatorUser } from "./user.validator.js";
import { uploadAvatar } from "../middleware/uploadAvatar.js";

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
 *     summary: Register a new user
 *     description: Register a new user with email and password
 *     tags: [Users]
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
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                  type: string
 *                 subscription:
 *                  type: string
 *                 avatarURL:
 *                  type: string
 *       409:
 *         description: Email already in use
 *       400:
 *         description: Bad Request
 */
router.post("/signup", bodyValidate(validatorUser), signup);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in user
 *     description: Log in user with email and password
 *     tags: [Users]
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
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          subscription:
 *                              type: string
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
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

export default router;

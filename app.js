import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import connectToDatabase from "./db.js";
import contactsRouter from "./contacts/contacts.routes.js";
import usersRouter from "./users/user.routes.js";
import { auth } from "./users/middleware/authenticate.js";

import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.js";

const app = express();

dotenv.config();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const connection = connectToDatabase();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/contacts", auth, contactsRouter);
app.use("/avatars", express.static("public/avatars"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500).json({ message: err.message });
});

export default app;

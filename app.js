import express from "express";
import logger from "morgan";
import cors from "cors";
import contactsRouter from "./contacts/contacts.routes.js";
import usersRouter from "./users/user.routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { auth } from "./users/middleware/authenticate.js";

const app = express();

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

connection.once("open", () => {
  console.log("Database connection successful");
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/contacts", auth, contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;

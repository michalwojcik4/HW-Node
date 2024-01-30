import express from "express";
import logger from "morgan";
import cors from "cors";
import contactsRouter from "./contacts/contacts.routes.js";
import usersRouter from "./users/user.routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { auth } from "./users/middleware/authenticate.js";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const app = express();

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description:
        "This project is a simple REST API for managing a collection of contacts. It utilizes Express.js for the web server, with additional middleware for logging (morgan) and handling Cross-Origin Resource Sharing (CORS). The API supports basic CRUD operations for contacts stored in a JSON file.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Phonebook",
      },
    ],
  },
  apis: ["./users/user.routes.js", "./contacts/contacts.routes.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

mongoose.connect(process.env.MONGO_URL);

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
app.use("/avatars", express.static("public/avatars"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;

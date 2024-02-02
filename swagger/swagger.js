import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

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
  apis: [
    "./swagger/swaggerCommentsUsers.js",
    "./swagger/swaggerCommentsContacts.js",
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;

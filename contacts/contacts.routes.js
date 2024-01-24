import express from "express";

import { indexContacts } from "./controllers/indexContacts.js";
import { showContacts } from "./controllers/showContacts.js";
import { createContacts } from "./controllers/createContacts.js";
import { deleteContacts } from "./controllers/deleteContacts.js";
import { updateContacts } from "./controllers/updateContacts.js";
import { updateFavoriteContact } from "./controllers/updateFavoriteContact.js";

import { bodyValidate } from "../middleware/Validate.js";
import { validatorContact } from "./contact.validator.js";

const router = express.Router();

router.get("/", indexContacts);
router.get("/:email", showContacts);
router.post("/", bodyValidate(validatorContact), createContacts);
router.delete("/:email", deleteContacts);
router.put("/:email", bodyValidate(validatorContact), updateContacts);
router.patch("/:email/favorite", updateFavoriteContact);

export default router;

import express from "express";

import { indexContacts } from "#controllers/contacts/indexContacts.js";
import { showContacts } from "#controllers/contacts/showContacts.js";
import { createContacts } from "#controllers/contacts/createContacts.js";
import { deleteContacts } from "#controllers/contacts/deleteContacts.js";
import { updateContacts } from "#controllers/contacts/updateContacts.js";
import { updateFavoriteContact } from "#controllers/contacts/updateFavoriteContact.js";

const router = express.Router();

router.get("/api/contacts", indexContacts);
router.get("/api/contacts/:id", showContacts);
router.post("/api/contacts", createContacts);
router.delete("/api/contacts/:id", deleteContacts);
router.put("/api/contacts/:id", updateContacts);
router.patch("/api/contacts/:id/favorite", updateFavoriteContact);

export default router;

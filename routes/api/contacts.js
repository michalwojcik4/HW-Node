import express from "express";
import Joi from "joi";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts.js";

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Z][a-z]+ [A-Z][a-z]+$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
});

router.get("/api/contacts", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    if (!contacts) {
      return res.status(404).json({ message: "Not found file" });
    }
    return res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/api/contacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    res.json(contact);
  } catch (error) {
    if (error.message === "Contact not found") {
      return res.status(404).json({ message: "Not found" });
    }
    next(error);
  }
});

router.post("/api/contacts", async (req, res, next) => {
  try {
    const newContact = req.body;
    const { error } = contactSchema.validate(newContact);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const contact = await addContact(newContact);
    res.status(201).json(contact);
  } catch (error) {
    if (error.message === "missing required name") {
      return res.status(400).json({ message: "Missing required name" });
    }
    if (error.message === "missing required email") {
      return res.status(400).json({ message: "Missing required email" });
    }
    if (error.message === "missing required phone") {
      return res.status(400).json({ message: "Missing required phone" });
    }
    next(error);
  }
});

router.delete("/api/contacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await removeContact(id);
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    if (error.message === "Contact not found") {
      return res.status(404).json({ message: "Not found" });
    }
    next(error);
  }
});

router.put("/api/contacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const { error } = contactSchema.validate(body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = await updateContact(id, body);
    res.status(200).json(updatedContact);
  } catch (error) {
    if (error.message === "Contact not found") {
      return res.status(404).json({ message: "Not found" });
    }
    if (error.message === "Missing fields") {
      return res.status(400).json({ message: "Missing fields" });
    }
    next(error);
  }
});

export default router;

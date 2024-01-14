import { addContact } from "#models/contacts.js";
import { contactSchema } from "#validators/contactSchema.js";

const createContacts = async (req, res, next) => {
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
};

export { createContacts };

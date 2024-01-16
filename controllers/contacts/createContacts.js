import { addContact } from "#service/contacts.js";
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
    next(error);
  }
};

export { createContacts };

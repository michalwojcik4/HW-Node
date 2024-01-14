import { updateContact } from "#models/contacts.js";
import { contactSchema } from "#validators/contactSchema.js";

const updateContacts = async (req, res, next) => {
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
};

export { updateContacts };

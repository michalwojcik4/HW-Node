import { updateContact } from "#service/contacts.js";
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
    next(error);
  }
};

export { updateContacts };

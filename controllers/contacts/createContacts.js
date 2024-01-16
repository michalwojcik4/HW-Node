import { Contact } from "#service/schemas/contactSchema.js";
import { contactSchema } from "#validators/contactSchema.js";

const createContacts = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const body = { name, email, phone };
    const contact = await Contact.create(body);

    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export { createContacts };

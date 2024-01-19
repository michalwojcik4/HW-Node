import { Contact } from "../contact.schema.js";

const createContacts = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const contact = await Contact.findOne({ email, owner: req.user._id });
    if (contact) {
      return res
        .status(404)
        .json({ message: "Contact with such an email already exists" });
    }

    const body = { name, email, phone, owner: req.user._id };
    const newContact = await Contact.create(body);

    return res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return next(error);
  }
};

export { createContacts };

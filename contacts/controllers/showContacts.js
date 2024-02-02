import { Contact } from "../contact.schema.js";

const showContacts = async (req, res, next) => {
  try {
    const { email } = req.params;

    const contact = await Contact.findOne({ email, owner: req.user._id });

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(contact);
  } catch (error) {
    next(error);
  }
};

export { showContacts };

import { Contact } from "#service/schemas/contactSchema.js";

const indexContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json({
      contacts,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
    next(e);
  }
};

export { indexContacts };

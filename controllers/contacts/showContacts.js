import { Contact } from "#service/schemas/contactSchema.js";

const showContacts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
    next(e);
  }
};

export { showContacts };

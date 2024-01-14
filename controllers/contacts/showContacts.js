import { getContactById } from "#models/contacts.js";

const showContacts = async (req, res, next) => {
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
};

export { showContacts };

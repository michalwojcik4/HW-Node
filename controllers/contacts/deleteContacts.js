import { removeContact } from "#models/contacts.js";

const deleteContacts = async (req, res, next) => {
  try {
    const { id } = req.params;
    await removeContact(id);
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    if (error.message === "Contact not found") {
      return res.status(404).json({ message: "Not found" });
    }
    next(error);
  }
};

export { deleteContacts };

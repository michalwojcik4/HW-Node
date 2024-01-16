import { removeContact } from "#service/contacts.js";

const deleteContacts = async (req, res, next) => {
  try {
    const { id } = req.params;
    await removeContact(id);
    res.status(200).json({ message: "Contact deleted" });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
    next(e);
  }
};

export { deleteContacts };

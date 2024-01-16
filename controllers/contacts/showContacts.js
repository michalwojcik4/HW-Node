import { getContactById } from "#service/contacts.js";

const showContacts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    res.json(contact);
  } catch (e) {
    res.status(404).json({ message: "Not found" });
    next(e);
  }
};

export { showContacts };

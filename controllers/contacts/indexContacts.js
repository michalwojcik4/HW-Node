import { listContacts } from "../../service/contacts.js";

const indexContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      contacts,
    });
  } catch (e) {
    res.status(500).json(`An error occurred: ${e}`);
    next(e);
  }
};

export { indexContacts };

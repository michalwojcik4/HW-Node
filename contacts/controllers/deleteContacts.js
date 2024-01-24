import { Contact } from "../contact.schema.js";

const deleteContacts = async (req, res, next) => {
  try {
    const { email } = req.params;

    const removedContact = await Contact.findOneAndDelete({
      email,
      owner: req.user._id,
    });

    if (!removedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return next(error);
  }
};

export { deleteContacts };

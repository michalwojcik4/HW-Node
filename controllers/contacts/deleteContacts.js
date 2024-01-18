import { Contact } from "#service/schemas/contactSchema.js";

const deleteContacts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const removedContact = await Contact.findByIdAndDelete(id);

    if (!removedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export { deleteContacts };

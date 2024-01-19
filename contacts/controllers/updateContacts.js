import { Contact } from "../contact.schema.js";

const updateContacts = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { name, phone } = req.body;

    const updatedContact = await Contact.findOneAndUpdate(
      { email, owner: req.user._id },
      {
        $set: { name, email, phone },
      },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return next(error);
  }
};

export { updateContacts };

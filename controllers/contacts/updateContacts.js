import { Contact } from "#service/schemas/contactSchema.js";
import { contactSchema } from "#validators/contactSchema.js";

const updateContacts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      {
        $set: { name, email, phone },
      },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return next(error);
  }
};

export { updateContacts };

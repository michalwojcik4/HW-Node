import { Contact } from "../contact.schema.js";

const indexContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id });

    return res.status(200).json({
      contacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return next(error);
  }
};

export { indexContacts };

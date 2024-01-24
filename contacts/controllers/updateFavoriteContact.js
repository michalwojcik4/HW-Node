import { Contact } from "../contact.schema.js";

const updateFavoriteContact = async (req, res, next) => {
  const { email } = req.params;
  const { favorite } = req.body;

  if (typeof favorite !== "boolean") {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { email, owner: req.user._id },
      {
        $set: { favorite },
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

export { updateFavoriteContact };

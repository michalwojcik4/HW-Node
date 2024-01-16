import { Contact } from "./schemas/contact.schemas.js";

const listContacts = async () => {
  try {
    const data = await Contact.find();
    return data;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone, favorite } = body;
    if (!name) {
      throw new Error("missing required name");
    }
    if (!email) {
      throw new Error("missing required email");
    }
    if (!phone) {
      throw new Error("missing required phone");
    }
    const newContact = Contact.create({
      name,
      email,
      phone,
      favorite,
    });
    return newContact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const isContact = contacts.find((contact) => contact.id === contactId);
    if (!isContact) {
      throw new Error("Contact not found");
    }
    const updatedContacts = Contact.findOneAndDelete({ _id: contactId });
    return updatedContacts;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();

    const isContact = contacts.find((contact) => contact.id === contactId);
    if (!isContact) {
      throw new Error("Contact not found");
    }

    const { name, email, phone } = body;
    if (!name || !email || !phone) {
      throw new Error("Missing fields");
    }

    const updatedContacts = Contact.findOneAndUpdate(
      { _id: contactId },
      {
        name,
        email,
        phone,
      }
    );
    return updatedContacts;
  } catch (error) {
    throw error;
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

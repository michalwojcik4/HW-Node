import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join(process.cwd(), "./models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
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
    const contacts = await listContacts();
    const { name, email, phone } = body;
    if (!name) {
      throw new Error("missing required name");
    }
    if (!email) {
      throw new Error("missing required email");
    }
    if (!phone) {
      throw new Error("missing required phone");
    }
    const newContact = { id: nanoid(), ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
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
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
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

    const updatedContacts = contacts.map((contact) =>
      contact.id === contactId ? { ...contact, ...body } : contact
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return updatedContacts.find((contact) => contact.id === contactId);
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

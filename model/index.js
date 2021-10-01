const fs = require('fs/promises')
const contacts = require('./contacts.json')
const { v4 } = require('uuid')
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => contacts

const getContactById = async (id) => {
  const contactId = isNaN(id) ? id : Number(id);
  const contacts = await listContacts()
  const contactById = contacts.findIndex(item => item.id === contactId)
  if (contactById === -1) {
    return null;
  }
  return contacts[contactById]
}

const updateContact = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
}

const updateContactById = async (id, data) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === id)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...contacts[idx], ...data };
  await updateContact(contacts)
  return contacts[idx]
};

const removeContact = async (id) => {
  const contactId = isNaN(id) ? id : Number(id)
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts.splice(idx, 1)
  await updateContact(contacts)
  return true
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts()
  const newContact = {
    id: v4(),
    name,
    email,
    phone
  }
  contacts.push(newContact)

  await updateContact(contacts)

  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactById
}

require('colors');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Получение списка всех контактов
async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
}

// Получаем контакт по его id
async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === Number(contactId));
  if (!contactById) return null;
  return contactById;
}

// Удаляем контакт по id
async function removeContact(contactId) {
  const contacts = await listContacts();
  const idxContact = contacts.findIndex((contact) => contact.id === Number(contactId));

  if (idxContact === -1) return null;
  contacts.splice(idxContact, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log('<< Contact successfully deleted >>'.cyan);
}

async function addContact(name, email, phone) {
  const newContact = {
    id: Date.now(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log('<< Contact added successfully >>'.cyan);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

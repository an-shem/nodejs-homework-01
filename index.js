const { Command } = require('commander');
const program = new Command();

const contactsApi = require('./contacts.js');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contactsApi.listContacts().then((data) => console.table(data));
      break;

    case 'get':
      contactsApi.getContactById(id).then((data) => console.table(data));
      break;

    case 'add':
      contactsApi.addContact(name, email, phone).then((data) => console.table(data));
      break;

    case 'remove':
      contactsApi.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

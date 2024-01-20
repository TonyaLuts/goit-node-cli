const contacts = require("./contacts.js");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);

    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "rsKkOQUi80UsgVPCcLZZW" });
// invokeAction({
//   action: "add",
//   name: "Artem",
//   email: "artem@gmail.com",
//   phone: "(050) 123-4567",
// });
// invokeAction({
//   action: "remove",
//   id: "t4tWqRTl6dtcgHtKwQHsL",
// });

import { createAddButton, contacts } from "./index.js";

function displayContacts(contactList) {
	let main = document.querySelector("main");
	main.innerHTML = "";
	main.setAttribute("displaying", "contact");

	let title = document.querySelector(".window-title");
	title.disabled = true;

	let contactsButton = document.querySelector(".contacts-button");
	contactsButton.disabled = true;

	let tagContainer = document.querySelector(".tag-display-container");
	tagContainer.innerHTML = "";

	let contactsContainer = displayContactList(contactList.collection);

	main.appendChild(contactsContainer);
	main.appendChild(createAddButton(addContact(contactList)));
}

function displayContactList(contactList) {
	let contactsContainer = document.createElement("div");
	contactsContainer.classList.add("contacts-container");
	for (let contact of contactList) {
		contactsContainer.appendChild(displayContact(contact));
	}
	return contactsContainer;
}

function displayContact(contact) {
	let listing = document.createElement("div");
	listing.classList.add("contact-listing");
	listing.contact = contact;

	let name = document.createElement("a");
	name.textContent =
		contact.contactName.last + ", " + contact.contactName.first;
	name.addEventListener("click", () => contact.display());

	listing.appendChild(name);
	listing.appendChild(deleteButton(listing));

	return listing;
}

function addContact(contactList) {
	return () => {
		contactList.collection.add(contactList.itemGenerator());
		displayContacts(contactList);
	};
}

function deleteButton(listing) {
	let button = document.createElement("button");
	button.classList.add("contact-listing-delete-button");
	button.textContent = "Delete";
	button.addEventListener("click", () => deleteListing(listing));

	return button;
}

function deleteListing(listing) {
	contacts.delete(listing.contact);
	document.querySelector(".contacts-container").removeChild(listing);
}

function displayAssociatedContacts(parentObj) {
	let contactList = parentObj.tags
		.list()
		.filter((tag) => tag.tagType === "contact")
		.map((tag) => tag.id);

	return displayContactList(contactList);
}

function toggleContactDisplay(){
	let main = document.querySelector("main");
	let displayingContacts = !main.displayingContacts;
	main.setAttribute('displaying-contacts', displayingContacts);
}

let contactsButton = document.createElement("button");
contactsButton.classList.add("contacts-button");
contactsButton.addEventListener('click', toggleContactDisplay);


export { displayContacts, displayAssociatedContacts, contactsButton };

import { displayTodoList, displayAddTodoWindow } from "./todo-list-display.js";
import { createAddButton } from "./index.js";
import { contact } from "./todo.js";
import { toggleEdit, stopEdit } from "./edit-display.js";

function displayContactWindow(contact) {
	let main = document.querySelector("main");
	main.innerHTML = "";

	let title = document.querySelector(".window-title");
	title.disabled = true;
	title.value = contact.contactName.first + " " + contact.contactName.last;
	title.activeObject = contact;

	let contactsButton = document.querySelector(".contacts-button");
	contactsButton.disabled = false;

	main.appendChild(displayContactInfo(contact));
	main.appendChild(displayTodoList(contact.todoList.list()));
	main.appendChild(createAddButton(displayAddTodoWindow));

	let body = document.querySelector("body");
	body.toggleEditing = toggleContactEdit;

	stopEdit();
}

function displayContactInfo(contact) {
	let infoDisplay = document.createElement("div");
	infoDisplay.classList.add("contact-info-display");

	let emailDisplay = createEmailDisplay(contact);

	let phoneDisplay = createPhoneDisplay(contact);

	let orgDisplay = createOrgDisplay(contact);

	for (let infoField of [orgDisplay, phoneDisplay, emailDisplay]) {
		infoDisplay.appendChild(infoField);
	}

	return infoDisplay;
}

function createEmailDisplay(contact) {
	let emailDisplay = document.createElement("input");
	emailDisplay.classList.add("contact-email-display");
	emailDisplay.value = contact.email;
	emailDisplay.disabled = true;
	emailDisplay.addEventListener("change", () =>
		updateField(contact, "email", emailDisplay)
	);

	return emailDisplay;
}

function createPhoneDisplay(contact) {
	let phoneDisplay = document.createElement("input");
	phoneDisplay.classList.add("contact-phone-display");
	phoneDisplay.value = contact.phone;
	phoneDisplay.disabled = true;
	phoneDisplay.addEventListener("change", () =>
		updateField(contact, "phone", phoneDisplay)
	);

	return phoneDisplay;
}

function createOrgDisplay(contact) {
	let orgDisplay = document.createElement("input");
	orgDisplay.classList.add("contact-org-display");
	orgDisplay.value = contact.organization;
	orgDisplay.disabled = true;
	orgDisplay.addEventListener("change", () =>
		updateField(contact, "organization", orgDisplay)
	);

	return orgDisplay;
}

function createFirstNameDisplay(contact) {
	let firstDisplay = document.createElement("input");
	firstDisplay.classList.add("contact-first-display");
	firstDisplay.value = contact.contactName.first;
	firstDisplay.addEventListener("change", () =>
		updateField(contact.contactName, "first", firstDisplay)
	);

	return firstDisplay;
}

function createLastNameDisplay(contact) {
	let lastDisplay = document.createElement("input");
	lastDisplay.classList.add("contact-last-display");
	lastDisplay.value = contact.contactName.last;
	lastDisplay.addEventListener("change", () =>
		updateField(contact.contactName, "last", lastDisplay)
	);

	return lastDisplay;
}

function updateField(contact, fieldName, source) {
	contact[fieldName] = source.value;
}

function toggleContactEdit() {
	toggleEdit();
	let contact = document.querySelector(".window-title").activeObject;
	let editing = document.querySelector("body").editing;
	if (editing) prependNameDisplays(contact);
	else if (!editing){
		removeNameDisplays();
		contact.display();
	} 
	document.querySelector(".contact-email-display").disabled = !editing;
	document.querySelector(".contact-phone-display").disabled = !editing;
	document.querySelector(".contact-org-display").disabled = !editing;
}

function prependNameDisplays(contact) {
	let infoContainer = document.querySelector(".contact-info-display");
	infoContainer.prepend(createLastNameDisplay(contact));
	infoContainer.prepend(createFirstNameDisplay(contact));
}

function removeNameDisplays() {
	let infoContainer = document.querySelector(".contact-info-display");
	infoContainer.removeChild(
		infoContainer.querySelector(".contact-first-display")
	);
	infoContainer.removeChild(
		infoContainer.querySelector(".contact-last-display")
	);
}

contact.proto.display = function () {
	displayContactWindow(this);
};

export { displayContactWindow };

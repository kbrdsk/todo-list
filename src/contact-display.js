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

	let emailDisplay = createInfoFieldDisplay(contact, "email", true);

	let phoneDisplay = createInfoFieldDisplay(contact, "phone", true);

	let orgDisplay = createInfoFieldDisplay(contact, "organization", true);

	for (let infoField of [orgDisplay, phoneDisplay, emailDisplay]) {
		infoDisplay.appendChild(infoField);
	}

	return infoDisplay;
}

function createInfoFieldDisplay(parentObj, fieldName, disabled) {
	let fieldNameDisplay = document.createElement("span");
	fieldNameDisplay.textContent =
		fieldName[0].toUpperCase() + fieldName.slice(1) + ": ";

	let fieldContentDisplay = document.createElement("input");
	fieldContentDisplay.classList.add("contact-info-field-content");
	fieldContentDisplay.value = parentObj.fieldName;
	fieldContentDisplay.disabled = disabled;
	fieldContentDisplay.addEventListener("change", () =>
		updateField(contact, "fieldName", fieldContentDisplay)
	);

	let fieldDisplay = document.createElement("div");
	fieldDisplay.classList.add(`contact-${fieldName}-display`);
	fieldDisplay.classList.add("contact-info-field-display");

	for (let element of [fieldNameDisplay, fieldContentDisplay]) {
		fieldDisplay.appendChild(element);
	}

	return fieldDisplay;
}

function updateField(contact, fieldName, source) {
	contact[fieldName] = source.value;
}

function toggleContactEdit() {
	toggleEdit();
	let contact = document.querySelector(".window-title").activeObject;
	let editing = document.querySelector("body").editing;
	if (editing) prependNameDisplays(contact);
	else if (!editing) {
		removeNameDisplays();
		contact.display();
	}

	for (let field of document.getElementsByClassName(
		"contact-info-field-content"
	)) {
		field.disabled = !editing;
	}
}

function prependNameDisplays(contact) {
	let infoContainer = document.querySelector(".contact-info-display");
	infoContainer.prepend(
		createInfoFieldDisplay(contact.contactName, "last", false)
	);
	infoContainer.prepend(
		createInfoFieldDisplay(contact.contactName, "first", false)
	);
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

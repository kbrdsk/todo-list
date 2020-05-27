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

	let emailDisplay = document.createElement("input");
	emailDisplay.classList.add("contact-email-display");
	emailDisplay.value = contact.email;
	emailDisplay.disabled = true;
	emailDisplay.addEventListener("change", () =>
		updateField(contact, "email", emailDisplay)
	);

	let phoneDisplay = document.createElement("input");
	phoneDisplay.classList.add("contact-phone-display");
	phoneDisplay.value = contact.phone;
	phoneDisplay.disabled = true;
	phoneDisplay.addEventListener("change", () =>
		updateField(contact, "phone", phoneDisplay)
	);

	let orgDisplay = document.createElement("input");
	orgDisplay.classList.add("contact-org-display");
	orgDisplay.value = contact.organization;
	orgDisplay.disabled = true;
	orgDisplay.addEventListener("change", () =>
		updateField(contact, "organization", orgDisplay)
	);

	for (let infoField of [orgDisplay, phoneDisplay, emailDisplay]) {
		infoDisplay.appendChild(infoField);
	}

	return infoDisplay;
}

function updateField(contact, fieldName, source) {
	contact[fieldName] = source.value;
}

function toggleContactEdit() {
	toggleEdit();
	let editing = document.querySelector("body").editing;
	document.querySelector(".contact-email-display").disabled = !editing;
	document.querySelector(".contact-phone-display").disabled = !editing;
	document.querySelector(".contact-org-display").disabled = !editing;
}

contact.proto.display = function () {
	displayContactWindow(this);
};

export { displayContactWindow };

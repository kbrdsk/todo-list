import { project } from "./todo.js";
import { createAddButton } from "./index.js";
import { displayTodoList, displayAddTodoWindow } from "./todo-list-display.js";
import { displayAssociatedContacts } from "./contact-list-display.js";
import { displayDescription } from "./todo-display.js";
import { displayTags } from "./tag-display.js";

function displayProject(projectItem) {
	let main = document.querySelector("main"),
		title = document.querySelector(".window-title"),
		tagContainer = document.querySelector(".tag-display-container"),
		contactsButton = document.querySelector(".contacts-button");

	main.setAttribute("displaying", "project");
	main.setAttribute("displaying-contacts", false);
	main.displayingContacts = false;
	main.innerHTML = "";

	contactsButton.disabled = false;

	title.value = projectItem.title;
	title.disabled = false;
	title.activeObject = projectItem;

	let todoListDisplay = displayTodoList(projectItem.todoList.list());

	main.appendChild(displayDescription(projectItem));
	main.appendChild(todoListDisplay);
	main.appendChild(displayAssociatedContacts(projectItem));

	main.appendChild(createAddButton(displayAddTodoWindow));

	tagContainer.innerHTML = "";
	tagContainer.appendChild(displayTags(projectItem.tags.list()));
}

project.proto.display = function () {
	displayProject(this);
};

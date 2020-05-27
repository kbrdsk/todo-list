import { displayTags } from "./tag-display.js";
import { todo } from "./todo.js";

function displayTodoWindow(todoItem) {
	let title = document.querySelector(".window-title"),
		main = document.querySelector("main"),
		tagContainer = document.querySelector(".tag-display-container"),
		contactsButton = document.querySelector(".contacts-button");

	main.innerHTML = "";
	main.setAttribute("displaying", "todo");

	contactsButton.disabled = false;

	title.value = todoItem.title;
	title.disabled = false;
	title.activeObject = todoItem;

	main.appendChild(displayDescription(todoItem));

	tagContainer.innerHTML = "";
	tagContainer.appendChild(displayTags(todoItem.tags.list()));
}

function displayDescription(todoItem) {
	let description = document.createElement("textarea");
	description.classList.add("description");
	description.value = todoItem.description;
	description.activeObject = todoItem;
	description.addEventListener("change", (e) => changeDescription(e.target));

	return description;
}

function changeDescription(description) {
	description.activeObject.description = description.value;
}

todo.proto.display = function () {
	displayTodoWindow(this);
};

export { displayTodoWindow, displayDescription };

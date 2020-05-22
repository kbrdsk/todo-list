import {displayTodoList, displayAddTodoWindow} from './todo-list-display.js';
import {createAddButton, todos, projects} from './index.js';
import {contact} from './todo.js';

function displayContactWindow(contact){
	let main = document.querySelector('main');
	main.innerHTML = '';

	let title = document.querySelector('.window-title');
	title.disabled = true;
	title.value = contact.contactName.first +
				' ' +
				contact.contactName.last;

	main.appendChild(displayContactInfo(contact));
	main.appendChild(displayTodoList(contact.todoList.list()));
	main.appendChild(createAddButton(displayAddTodoWindow));

}

function displayContactInfo(contact){
	let infoDisplay = document.createElement('div');
	return infoDisplay;
}

function addTodo(contact){
	return () => {
		contact.todoList.add(todos.itemGenerator());
		displayContactWindow(contact);
	}
}

contact.proto.display = function (){
	displayContactWindow(this);
}

export {displayContactWindow};
import {displayTodoList} from './todo-list.js';
import {createAddButton} from './index.js';
import {todo} from './todo.js';

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
	main.appendChild(createAddButton(addTodo(contact)));

}

function displayContactInfo(contact){
	let infoDisplay = document.createElement('div');
	return infoDisplay;
}

function addTodo(contact){
	return () => {
		contact.todoList.add(todo());
		displayContactWindow(contact);
	}
}

export {displayContactWindow};
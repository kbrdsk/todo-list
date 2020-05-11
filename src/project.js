import {project, todo, category, contact} from './todo.js'; 
import {projects, todos, categories, contacts} from './index.js';
import {displayTodoList} from './todo-list.js';

function displayProject(projectItem){
	let main = document.querySelector('main'),
		title = document.querySelector('.window-title');

	main.innerHTML = '';

	title.textContent = projectItem.title;

	let todoListDisplay = displayTodoList(projectItem.todoList.list());

	main.appendChild(todoListDisplay);

	main.appendChild(createAddButton(projectItem));
}

function createAddButton(projectItem){
	let addButton = document.createElement('button');
	addButton.classList.add('add-button');
	addButton.textContent = '+';
	addButton.addEventListener('click', () => addTodoItem(projectItem));

	return addButton;
}

function addTodoItem(projectItem){
	let newTodo = todo();
	todos.add(newTodo);
	projectItem.todoList.add(newTodo);
	displayProject(projectItem);
}

export {displayProject};
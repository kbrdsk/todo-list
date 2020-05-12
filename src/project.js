import {project, todo, category, contact} from './todo.js'; 
import {projects, todos, createAddButton} from './index.js';
import {displayTodoList} from './todo-list.js';
import {displayDescription} from './todo-display.js';

function displayProject(projectItem){
	let main = document.querySelector('main'),
		title = document.querySelector('.window-title');

	main.setAttribute('displaying', 'project');
	main.innerHTML = '';

	title.value = projectItem.title;
	title.disabled = false;
	title.activeObject = projectItem;

	let todoListDisplay = displayTodoList(projectItem.todoList.list());

	main.appendChild(displayDescription(projectItem));
	main.appendChild(todoListDisplay);
	main.appendChild(createAddButton(() => addTodoItem(projectItem)));
}

function addTodoItem(projectItem){
	let newTodo = todos.itemGenerator();
	todos.collection.add(newTodo);
	projectItem.todoList.add(newTodo);
	displayProject(projectItem);
}

export {displayProject};
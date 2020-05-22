import {project} from './todo.js'; 
import {projects, todos, createAddButton} from './index.js';
import {displayTodoList} from './todo-list-display.js';
import {displayDescription} from './todo-display.js';
import {displayTags} from './tag-display.js';

function displayProject(projectItem){
	let main = document.querySelector('main'),
		title = document.querySelector('.window-title'),
		tagContainer = document.querySelector('.tag-display-container');

	main.setAttribute('displaying', 'project');
	main.innerHTML = '';

	title.value = projectItem.title;
	title.disabled = false;
	title.activeObject = projectItem;

	let todoListDisplay = displayTodoList(projectItem.todoList.list());

	main.appendChild(displayDescription(projectItem));
	main.appendChild(todoListDisplay);
	main.appendChild(createAddButton(() => addTodoItem(projectItem)));

	tagContainer.innerHTML = '';
	tagContainer.appendChild(displayTags(projectItem.tags.list()));
}

function addTodoItem(projectItem){
	let newTodo = todos.itemGenerator();
	projectItem.todoList.add(newTodo);
	displayProject(projectItem);
}

project.proto.display = function (){
	displayProject(this);
}
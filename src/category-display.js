import {displayTodoList, displayAddTodoWindow} from './todo-list-display.js';
import {createAddButton, todos, projects} from './index.js';
import {category} from './todo.js';

function displayCategory(category){
	let main = document.querySelector('main');
	main.innerHTML = '';
	main.setAttribute('displaying', 'category');
	let tagContainer = document.querySelector('.tag-display-container');

	tagContainer.innerHTML = '';

	let title = document.querySelector('.window-title');
	title.activeObject = category;
	title.disabled = false;
	title.value = category.title;

	main.appendChild(displayTodoList(category.todoList.list()));
	main.appendChild(createAddButton(displayAddTodoWindow));

}

function addTodo(category){
	return () => {
		category.todoList.add(todos.itemGenerator());
		displayCategory(category);
	}
}

category.proto.display = function (){
	displayCategory(this);
}

/*export {displayCategory};*/
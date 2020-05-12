import {displayTodoList} from './todo-list.js';
import {createAddButton} from './index.js';
import {todo} from './todo.js';

function displayCategory(category){
	let main = document.querySelector('main');
	main.innerHTML = '';

	let title = document.querySelector('.window-title');
	title.activeObject = category;
	title.value = category.title;

	main.appendChild(displayTodoList(category.todoList.list()));
	main.appendChild(createAddButton(addTodo(category)));

}

function addTodo(category){
	return () => {
		category.todoList.add(todo());
		displayCategory(category);
	}
}

export {displayCategory};
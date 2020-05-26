import {todos, projects} from './index.js';
import {createAddWindow} from './add-window-display.js';

function displayTodoList(todoList){
	let listDisplay = document.createElement('div');
	listDisplay.classList.add('todo-list');

	for(let todoItem of todoList){
		listDisplay.appendChild(displayTodoItem(todoItem));
	}

	return listDisplay;
}

function displayTodoItem(item){
	let listing = document.createElement('div');
	listing.classList.add('todo-listing');
	listing.todoItem = item;
	listing.setAttribute('done', item.isDone);

	let checkBox = document.createElement('div');
	checkBox.classList.add('todo-checkbox');
	checkBox.textContent = '\u2713';
	checkBox.addEventListener('click', e => toggleTodoFinished(listing, e.target));

	let title = document.createElement('a');
	title.textContent = item.title;
	title.addEventListener('click', () => item.display());

	let dueWarning = document.createElement('span');
	dueWarning.classList.add('due-warning');

	let deleteButton = createDeleteButton(item);


	for(let listingElement of [checkBox, dueWarning, title, deleteButton]){
		listing.appendChild(listingElement);
	}

	return listing;
}

function createDeleteButton(todo){
	let button = document.createElement('button');
	button.classList.add('todo-delete-button');
	button.textContent = 'delete';
	button.addEventListener('click', () => deleteTodo(todo));

	return button;
}

function deleteTodo(todo){
	let currentObject = document.querySelector('.window-title').activeObject;
	currentObject.todoList.remove(todo);
	let tag = todo.tags.list().filter(tag => tag.id === currentObject)[0];
	todo.tags.remove(tag);
	currentObject.display();
}

function toggleTodoFinished(listing, checkBox){
	let isDone = !listing.todoItem.isDone;
	listing.todoItem.isDone = isDone;
	listing.setAttribute('done', isDone);
}

function displayAddTodoWindow(){
	let receiverFunc = (current, selected) => {
		return {receiver: current, item:selected};
	}
	let addWindow = createAddWindow(receiverFunc);
	Object.assign(addWindow.typeSelectors, 
			{'Existing Todo': todos, 'Existing Project': projects});
	Object.assign(addWindow.newItems,
			{'New Todo': todos, 'New Project': projects});
	addWindow.display();
}

export {displayTodoList, displayAddTodoWindow};
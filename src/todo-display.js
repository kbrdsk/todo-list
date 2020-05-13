import {displayTags} from './tag-display.js';

function displayTodoWindow(todoItem){
	let title = document.querySelector('.window-title'),
		main = document.querySelector('main'),
		tagContainer = document.querySelector('.tag-display-container');

	main.innerHTML = '';
	main.setAttribute('displaying', 'todo');

	title.value = todoItem.title;
	title.disabled = false;
	title.activeObject = todoItem;

	main.appendChild(displayDescription(todoItem));

	tagContainer.innerHTML = '';
	tagContainer.appendChild(displayTags(todoItem.tags.list()));
}

function displayDescription(todoItem){
	let description = document.createElement('textarea');
	description.classList.add('description');
	description.value = todoItem.description;
	description.activeObject = todoItem
	description.addEventListener('change', e => 
		changeDescription(e.target));

	return description;
}

function changeDescription(description){
	description.activeObject.description = description.value;
}

export {displayTodoWindow, displayDescription};
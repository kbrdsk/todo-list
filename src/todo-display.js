function displayTodoWindow(todoItem){
	let title = document.querySelector('.window-title'),
		main = document.querySelector('main');

	main.innerHTML = '';
	title.value = todoItem.title;
	title.activeObject = todoItem;

	
	main.appendChild(displayDescription(todoItem));
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
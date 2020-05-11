function displayTodoWindow(todoItem){
	let title = document.querySelector('.window-title'),
		main = document.querySelector('main');

	main.innerHTML = '';
	title.value = todoItem.title;
	title.activeObject = todoItem;

	let description = document.createElement('textarea');
	description.value = todoItem.description;
	description.activeObject = todoItem
	description.addEventListener('change', e => 
		changeDescription(e.target));

	main.appendChild(description);
}

function changeDescription(description){
	description.activeObject.description = description.value;
}

export {displayTodoWindow};
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

	let checkBox = document.createElement('input');
	checkBox.classList.add('todo-checkbox');
	checkBox.setAttribute('type', 'checkbox');

	let title = document.createElement('a');
	title.textContent = item.title;
	title.textContent = item.title;

	let dueWarning = document.createElement('span');
	dueWarning.classList.add('due-warning');


	for(let listingElement of [checkBox, dueWarning, title]){
		listing.appendChild(listingElement);
	}

	return listing;
}

export {displayTodoList};
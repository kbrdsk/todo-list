import {todos, projects} from './index.js';

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


	for(let listingElement of [checkBox, dueWarning, title]){
		listing.appendChild(listingElement);
	}

	return listing;
}

function toggleTodoFinished(listing, checkBox){
	let isDone = !listing.todoItem.isDone;
	listing.todoItem.isDone = isDone;
	listing.setAttribute('done', isDone);
}








function displayAddTodoWindow(){
	let addTodoWindowContainer = document.createElement('div');
	addTodoWindowContainer.classList.add('popup-window-container');
	addTodoWindowContainer.close = () => {
		document.querySelector('body').removeChild(addTodoWindowContainer);
	}

	let addTodoWindow = document.createElement('div');
	addTodoWindow.classList.add('popup-window');
	addTodoWindow.classList.add('add-todo-window');

	let closeButton = createCloseButton(addTodoWindowContainer.close);

	let typeSelectContainer = document.createElement('div');
	typeSelectContainer.classList.add('type-select-container');

	addTodoWindow.appendChild(closeButton);
	addTodoWindow.appendChild(typeSelectContainer);
	addTodoWindowContainer.appendChild(addTodoWindow);
	document.querySelector('body').appendChild(addTodoWindowContainer);
	displayTypeSelectWindow();
}

function createCloseButton(closeFunction){
	let closeButton = document.createElement('div');
	closeButton.classList.add('close-button');
	closeButton.textContent = 'X';
	closeButton.addEventListener('click', closeFunction);

	return closeButton;
}

function displayTypeSelectWindow(){
	let todoTypeSelect = createTypeSelectButton(todos),
		projectTypeSelect = createTypeSelectButton(projects),
		newTodoButton = createNewTodoButton(),
		newProjectButton = createNewProjectButton();

	for(let button of [todoTypeSelect, projectTypeSelect, newTodoButton, newProjectButton]){
		document.querySelector('.type-select-container').appendChild(button);
	}
}

function createNewTodoButton(){
	let button = document.createElement('button');
	button.classList.add('add-new-todo-item-button');
	button.classList.add('todo-type-select-button');
	button.textContent = 'New Todo';
	button.addEventListener('click', () => addNewTodoItem(todos.itemGenerator()));

	return button;
}

function createNewProjectButton(){
	let button = document.createElement('button');
	button.classList.add('add-new-todo-item-button');
	button.classList.add('todo-type-select-button');
	button.textContent = 'New Project';
	button.addEventListener('click', () => addNewTodoItem(projects.itemGenerator()));

	return button;

}

function addNewTodoItem(newTodoItem){
	let parentItem = document.querySelector('.window-title').activeObject;
	parentItem.todoList.add(newTodoItem);
	parentItem.display();
	document.querySelector('.popup-window-container').close();
}

function createTypeSelectButton(collection){
	let title = (collection === projects)? 'Existing Project': 'Existing Todo';
	let button = document.createElement('button');
	button.textContent = title;
	button.classList.add('todo-type-select-button');
	button.addEventListener('click', ()   => {
		document.querySelector('.type-select-container').innerHTML = '';
		displayObjectSelectWindow(collection);
	});

	return button;
}

function displayObjectSelectWindow(collection){
	let selectedTodo = {listing: null};

	let typeSelectContainer = document.querySelector('.type-select-container');
	typeSelectContainer.appendChild(
		displayTodoObjectSelection(collection.collection, selectedTodo));
	
	let container = document.querySelector('.add-todo-window');
	container.appendChild(createBackButton());
	container.appendChild(createSelectButton(selectedTodo));
}

function createTodoListing(todoObject, displayList, selectedTag){
	let objectListing = document.createElement('div');
	objectListing.classList.add('tag-object-listing');
	objectListing.todoObject = todoObject;
	objectListing.textContent = todoObject.title;
	objectListing.addEventListener('click', () => selectListing(objectListing, selectedTag));
	displayList.appendChild(objectListing);

	return objectListing;
}

function createBackButton(){
	let container = document.querySelector('.add-todo-window');

	let backButton = document.createElement('button');
	backButton.classList.add('back-button');
	backButton.classList.add('add-todo-nav-button');
	backButton.textContent = 'Back';

	backButton.addEventListener('click', backToTypeSelect);

	return backButton;
}

function backToTypeSelect(){
	document.querySelector('.type-select-container').innerHTML = '';

	let container = document.querySelector('.add-todo-window');
	container.removeChild(document.querySelector('.back-button'));
	container.removeChild(document.querySelector('.select-button'));

	displayTypeSelectWindow();

}

function createSelectButton(selectedTodo){
	let selectButton = document.createElement('button');
	selectButton.classList.add('select-button');
	selectButton.classList.add('add-todo-nav-button');
	selectButton.textContent = 'Select';

	selectButton.addEventListener('click', () => submitAddTodo(selectedTodo)); 

	return selectButton;
}

function submitAddTodo(selectedTodo){
	if(selectedTodo.listing){
		addTodo(selectedTodo.listing.todoObject);
		document.querySelector('.popup-window-container').close();
	}	
}

function displayTodoObjectSelection(objectSet, selectedTodo){
	let displayList = document.createElement('div');
	displayList.classList.add('todo-selection-list');

	let parentObject = document.querySelector('.window-title').activeObject;
	let objectList = Array.from(objectSet)
						.filter(obj => !hasTodo(parentObject, obj));

	objectList.map(obj => createTodoListing(obj, displayList, selectedTodo));

	return displayList;
}

function selectListing(objectListing, selectedTodo){
	if(selectedTodo.listing){
		selectedTodo.listing.setAttribute('selected', false);
	}
	objectListing.setAttribute('selected', true);
	selectedTodo.listing = objectListing;
}

function addTodo(todo){
	let parentObject = document.querySelector('.window-title').activeObject;
	if(hasTodo(parentObject, todo)) return;
	parentObject.todoList.add(todo);
	parentObject.display();
}

function hasTodo(parentObject, todoObject){
	if(todoObject === parentObject) return true;
	return parentObject.todoList.list()
							.some(existingTodo => {
								return existingTodo === todoObject;
							});
}

export {displayTodoList, displayAddTodoWindow};
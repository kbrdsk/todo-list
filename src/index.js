import {todo, project, category, contact} from './todo.js';

let activeObj;

let todoCounter = 0,
	projCounter = 0,
	catCounter = 0,
	contactCounter = 0;

let body = document.querySelector('body');
body.style.display = 'flex';
body.style.flexDirection = 'column';

let activeObjDisplay = document.createElement('h1');
body.appendChild(activeObjDisplay);

let todolist = document.createElement('button'),
	tags = document.createElement('button'),
	self =  document.createElement('button');

todolist.textContent = 'todoList';
tags.textContent = 'tags';
self.textContent = 'self';

todolist.addEventListener('click', () => {
	console.log(activeObj.todoList.list());
});

tags.addEventListener('click', () => {
	console.log(activeObj.tags.list());
});

self.addEventListener('click', () => {
	console.log(activeObj);
});


for(let button of [todolist, tags, self]){
	body.appendChild(button);
}

let todoButton = document.createElement('button'),
	projButton = document.createElement('button'),
	catButton = document.createElement('button'),
	contactButton = document.createElement('button');

todoButton.textContent = 'new todo';
projButton.textContent = 'new project';
catButton.textContent = 'new category';
contactButton.textContent = 'new contact';

for(let button of [todoButton, projButton, catButton, contactButton]){
	body.appendChild(button);
}

todoButton.addEventListener('click', () => {
	let title = `todo ${todoCounter++}`;
	createTestButton(todo(title), title);
});

projButton.addEventListener('click', () => {
	let title = `proj ${projCounter++}`;
	createTestButton(project(title), title);
});

catButton.addEventListener('click', () => {
	let title = `cat ${catCounter++}`;
	createTestButton(category(title), title);
});

contactButton.addEventListener('click', () => {
	let title = `contact ${contactCounter++}`;
	createTestButton(contact(title), title);
});

function createTestButton(object, title){
	let button = document.createElement('button');
	button.obj = object;
	button.textContent = title;
	button.style.margin = '10px';
	let addButton = document.createElement('button');
	addButton.obj = object;
	addButton.textContent = 'add';
	button.addEventListener('click', e => activateObj(object, title));
	addButton.addEventListener('click', e => addToActive(object));
	body.appendChild(button);
	body.appendChild(addButton);
}

function activateObj(object, title){
	activeObj = object;
	activeObjDisplay.textContent = title;
}

function addToActive(object){
	activeObj.todoList.add(object);
}
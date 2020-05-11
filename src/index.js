import {todo, project, category, contact} from './todo.js';
import {displayCollection, createCollection} from './collection.js';
import './styles/style.css';

let projects = createCollection(project),
	categories = createCollection(category),
	contacts = new Set(),
	todos = new Set();

let body = document.querySelector('body'),
	header = document.querySelector('header'),
	footer = document.querySelector('footer'),
	main = document.querySelector('main');

let navButton = document.createElement('button'),
	windowTitle = document.createElement('input'),
	contactsButton = document.createElement('button');

windowTitle.setAttribute('type', 'text');
windowTitle.disabled = true;
windowTitle.addEventListener('change', e => changeTitle(e.target));

function changeTitle(title){
	title.activeObject.title = title.value;
}

navButton.classList.add('nav-button');
windowTitle.classList.add('window-title');
contactsButton.classList.add('contacts-button');

for(let headerElement of [navButton, windowTitle, contactsButton]){
	header.appendChild(headerElement);
}

//nav menu

let navMenu = document.createElement('div'),
	editLink = document.createElement('a'),
	categoriesLink = document.createElement('a'),
	projectsLink = document.createElement('a'),
	contactsLink = document.createElement('a');

navMenu.classList.add('nav-menu');
navMenu.setAttribute('showing', 'false');

editLink.classList.add('nav-link');
editLink.textContent = 'Edit';
editLink.addEventListener('click', openEditWindow);

categoriesLink.classList.add('nav-link');
categoriesLink.textContent = 'Categories';
categoriesLink.addEventListener('click', () => openCollectionWindow(categories));

projectsLink.classList.add('nav-link');
projectsLink.textContent = 'Projects';
projectsLink.addEventListener('click', () => openCollectionWindow(projects));

contactsLink.classList.add('nav-link');
contactsLink.textContent = 'Contacts';
contactsLink.addEventListener('click', openContactsWindow);

navMenu.appendChild(editLink);
navMenu.appendChild(projectsLink);
navMenu.appendChild(categoriesLink);
navMenu.appendChild(contactsLink);

navButton.addEventListener('click', toggleNavMenu);
window.addEventListener('click', closeNavMenu);

header.appendChild(navMenu);

function toggleNavMenu(){
	if(navMenu.getAttribute('showing') === 'true'){
		navMenu.setAttribute('showing', 'false');
	}
	else{
		setTimeout(() => navMenu.setAttribute('showing', 'true'), 5);
	} 
}

function openNavMenu(){
	navMenu.setAttribute('showing', 'true');
}

function closeNavMenu(){
	navMenu.setAttribute('showing', 'false');
}

function openCollectionWindow(collection){
	contactsButton.setAttribute('showing', 'false');
	windowTitle.disabled = true;
	main.innerHTML = '';

	let title = (collection === projects)? 'Projects': 'Categories';
	windowTitle.value = title;
	displayCollection(collection);
}

function openEditWindow(){

}

function openContactsWindow(){
	windowTitle.value = 'Contacts';

}


openCollectionWindow(projects);

export {projects, todos, categories, contacts};
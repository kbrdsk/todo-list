import {todo, project, category, contact} from './todo.js';
import './styles/style.css';

let projects = new Set(),
	categories = new Set(),
	contacts = new Set(),
	todos = new Set();

let body = document.querySelector('body'),
	header = document.querySelector('header'),
	footer = document.querySelector('footer'),
	main = document.querySelector('main');



//nav menu

let navButton = document.createElement('button'),
	navMenu = document.createElement('div'),
	editLink = document.createElement('a'),
	categoriesLink = document.createElement('a'),
	projectsLink = document.createElement('a'),
	contactsLink = document.createElement('a');

navButton.classList.add('nav-button');

navMenu.classList.add('nav-menu');
navMenu.setAttribute('showing', 'false');

editLink.classList.add('nav-link');
editLink.textContent = 'Edit';

categoriesLink.classList.add('nav-link');
categoriesLink.textContent = 'Categories';

projectsLink.classList.add('nav-link');
projectsLink.textContent = 'Projects';

contactsLink.classList.add('nav-link');
contactsLink.textContent = 'Contacts';

navMenu.appendChild(editLink);
navMenu.appendChild(projectsLink);
navMenu.appendChild(categoriesLink);
navMenu.appendChild(contactsLink);

navButton.addEventListener('click', toggleNavMenu);

header.appendChild(navButton);
header.appendChild(navMenu);

function toggleNavMenu(){
	if(navMenu.getAttribute('showing') === 'true'){
		navMenu.setAttribute('showing', 'false');
	}
	else navMenu.setAttribute('showing', 'true');
}

function openNavMenu(){
	navMenu.setAttribute('showing', 'true');
}

function closeNavMenu(){
	navMenu.setAttribute('showing', 'false');
}
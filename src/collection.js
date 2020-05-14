import {displayProject} from './project.js';
import {displayCategory} from './category-display.js';

function displayCollection(collection){
	let itemSet = collection.collection;
	let main = document.querySelector('main');
	let tagContainer = document.querySelector('.tag-display-container');

	tagContainer.innerHTML = '';

	main.setAttribute('displaying', 'collection');

	for(let item of itemSet){
		main.appendChild(displayItem(item));
	}

	let addButton = createAddButton(collection);
	main.appendChild(addButton);
}

function createAddButton(collection){
	let addButton = document.createElement('button');
	addButton.classList.add('add-button');
	addButton.textContent = '+';
	addButton.addEventListener('click', () => addItem(collection));

	return addButton;
}

function addItem(collection){
	let main = document.querySelector('main');
	let newItem = collection.itemGenerator();
	collection.collection.add(newItem);
	main.appendChild(displayItem(newItem));
}

function displayItem(item){
	let itemDisplay = document.createElement('div');
	itemDisplay.classList.add('collection-item-display');

	let title = document.createElement('h3');
	title.classList.add('collection-item-title');
	title.textContent = item.title;
	title.addEventListener('click', () => displayItemWindow(item))

	let preview = document.createElement('p');
	preview.classList.add('collection-item-preview');
	preview.textContent = item.description;

	let favorite = document.createElement('button');
	favorite.classList.add('collection-item-favorite');
	favorite.setAttribute('is-favorite', item.favorite);
	favorite.addEventListener('click', e => toggleFavorite(e.target, item));

	let header = document.createElement('header');
	header.classList.add('collection-item-header');

	header.appendChild(title);
	header.appendChild(favorite);

	itemDisplay.appendChild(header);
	itemDisplay.appendChild(preview);

	return itemDisplay;
}

function displayItemWindow(item){
	if(item.createTag().tagType === 'project') displayProject(item);
	if(item.createTag().tagType === 'category') displayCategory(item);
}

function toggleFavorite(display, item){
	item.favorite = !item.favorite;
	display.setAttribute('is-favorite', item.favorite);
}

function createCollection(itemGenerator){
	let collection = new Set();
	return {collection, itemGenerator};
}

export {displayCollection, createCollection};
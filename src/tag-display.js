import {displayProject} from './project.js';
import {displayCategory} from './category-display.js';
import {displayContactWindow} from './contact-display.js';
import {categories, projects} from './index.js';

function displayTags(tags){
	let container = document.createElement('div');
	container.classList.add('tag-container');
	for(let tag of tags){
		container.appendChild(displayTagItem(tag));
	}

	container.appendChild(addTagButton());

	return container;
}

function displayTagItem(tag){
	let tagDisplay = document.createElement('div');
	tagDisplay.classList.add('tag');
	tagDisplay.setAttribute('type', tag.tagType);

	let typeIcon = document.createElement('div');

	let titleDisplay = document.createElement('a');
	titleDisplay.textContent = tag.id.title;
	titleDisplay.addEventListener('click', () => loadReferencedObject(tag));

	tagDisplay.appendChild(typeIcon);
	tagDisplay.appendChild(titleDisplay);

	return tagDisplay;
}

function loadReferencedObject(tag){
	switch(tag.tagType){
		case 'contact': displayContactWindow(tag.id); break;
		case 'project': displayProject(tag.id); break;
		case 'category': displayCategory(tag.id); break;
	}
}

function addTagButton(){
	let button = document.createElement('div');
	button.classList.add('tag');
	button.classList.add('new-tag-button');
	button.textContent = '+New Tag';
	button.addEventListener('click', displayAddTagWindow);
	return button;
}

function displayAddTagWindow(){
	let selectedTag = {listing: null};

	let addTagWindowContainer = document.createElement('div');
	addTagWindowContainer.classList.add('popup-window-container');

	let addTagWindow = document.createElement('div');
	addTagWindow.classList.add('popup-window');
	addTagWindow.classList.add('add-tag-window');

	let closeTagWindow = () => {
		document.querySelector('body').removeChild(addTagWindowContainer);
	}

	let closeButton = document.createElement('div');
	closeButton.classList.add('close-button');
	closeButton.textContent = 'X';
	closeButton.addEventListener('click', closeTagWindow);

	let backButton = document.createElement('button');
	backButton.classList.add('back-button');
	backButton.classList.add('add-tag-nav-button');
	backButton.textContent = 'Back';

	let selectButton = document.createElement('button');
	selectButton.classList.add('select-button');
	selectButton.classList.add('add-tag-nav-button');
	selectButton.textContent = 'Select';

	let categoryTypeSelect = document.createElement('button');
	categoryTypeSelect.textContent = 'Category';

	let projectTypeSelect = document.createElement('button');
	projectTypeSelect.textContent = 'Project';

	let typeSelectContainer = document.createElement('div');
	typeSelectContainer.classList.add('type-select-container');

	for(let button of [backButton, selectButton]){
		button.setAttribute('showing', false);
	}

	for(let button of [categoryTypeSelect, projectTypeSelect]){
		button.classList.add('tag-type-select-button');
		button.addEventListener('click', ()   => {
			typeSelectContainer.innerHTML = '';
			typeSelectContainer.appendChild(displayTagObjectSelection(button, selectedTag));
			backButton.setAttribute('showing', true);
			selectButton.setAttribute('showing', true);
		});
		typeSelectContainer.appendChild(button);
	}

	backButton.addEventListener('click', () => {
		typeSelectContainer.innerHTML = '';
		selectedTag.listing = null;
		for(let button of [categoryTypeSelect, projectTypeSelect]){
			typeSelectContainer.appendChild(button);
		}
		backButton.setAttribute('showing', false);
		selectButton.setAttribute('showing', false);

	});

	selectButton.addEventListener('click', () => {
		if(selectedTag.listing){
			addTag(selectedTag.listing.tagObject.createTag());
			closeTagWindow();
		}
		
	})

	addTagWindow.appendChild(closeButton);
	addTagWindow.appendChild(typeSelectContainer);
	addTagWindow.appendChild(backButton);
	addTagWindow.appendChild(selectButton);

	addTagWindowContainer.appendChild(addTagWindow);
	document.querySelector('body').appendChild(addTagWindowContainer);
}

function displayTagObjectSelection(button, selectedTag){
	let objectSet;
	switch(button.textContent){
		case 'Project': objectSet = projects.collection; break;
		case 'Category': objectSet = categories.collection; break;
	}

	let displayList = document.createElement('div');
	displayList.classList.add('tag-selection-list');

	let parentObject = document.querySelector('.window-title').activeObject;
	let objectList = Array.from(objectSet)
						.filter(obj => !hasTag(parentObject, obj));

	for(let tagObject of objectList){
		let objectListing = document.createElement('div');
		objectListing.classList.add('tag-object-listing');
		objectListing.tagObject = tagObject;
		objectListing.textContent = tagObject.title;
		objectListing.addEventListener('click', () => {
			if(selectedTag.listing){
				selectedTag.listing.setAttribute('selected', false);
			}
			objectListing.setAttribute('selected', true);
			selectedTag.listing = objectListing;
		});
		displayList.appendChild(objectListing);
	}

	return displayList;
}

function addTag(tag){
	let parentObject = document.querySelector('.window-title').activeObject;
	if(hasTag(parentObject, tag.id)) return;
	tag.id.todoList.add(parentObject);
	document.querySelector('.tag-container').prepend(displayTagItem(tag));
}

function hasTag(parentObject, tagObject){
	return parentObject.tags.list()
							.some(existingTag => {
								return existingTag.id === tagObject;
							});
}

export{displayTags};
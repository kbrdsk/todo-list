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

	let addTagWindow = document.createElement('div');
	addTagWindow.classList.add('popup-window');
	addTagWindow.classList.add('add-tag-window');

	let closeTagWindow = () => {
		document.querySelector('main').removeChild(addTagWindow);
	}

	let closeButton = document.createElement('div');
	closeButton.classList.add('close-button');
	closeButton.textContent = 'X';

	let backButton = document.createElement('button');
	backButton.classList.add('back-button');
	backButton.classList.add('add-tag-nav-button');
	backButton.textContent = 'Back';
	backButton.addEventListener('click', closeTagWindow);

	let selectButton = document.createElement('button');
	backButton.classList.add('select-button');
	backButton.classList.add('add-tag-nav-button');
	backButton.textContent = 'Select';

	let categoryTypeSelect = document.createElement('button');
	categoryTypeSelect.textContent = 'Category';

	let projectTypeSelect = document.createElement('button');
	projectTypeSelect.textContent = 'Project';

	let typeSelectContainer = document.createElement('div');
	typeSelectContainer.classList.add('type-select-container');

	for(let button of [categoryTypeSelect, projectTypeSelect]){
		button.classList.add('tag-type-select-button');
		button.setAttribute('showing', false);
		button.addEventListener('click', ()   => {
			typeSelectContainer.innerHTML = '';
			typeSelectContainer.appendChild(displayTagObjectSelection(button, selectedTag));
			backButton.setAttribute('showing', true);
			selectButton.setAttribtue('showing', true);
		});
	}

	backButton.addEventListener('click', () => {
		typeSelectContainer.innerHTML = '';
		selectedObject.listing = null;
		for(let button in [categoryTypeSelect, projectTypeSelect]){
			typeSelectContainer.appendChild(button);
		}
		backButton.setAttribute('showing', false);
		selectButton.setAttribute('showing', false);

	});

	selectButton.addEventListener('click', () => {
		if(selectedObject.listing){
			addTag(selectedTag.listing.tagObject.createTag());
			closeTagWindow();
		}
		
	})

	addTagWindow.appendChild(closeButton);
	addTagWindow.appendChild(typeSelectContainer);
	addTagWindow.appendChild(backButton);
	addTagWindow.appendChild(selectButton);

	document.querySelector('main').appendChild(addTagWindow);
}

function displayTagTypeSelection(button, selectedTag){
	let objectList;
	switch(button.textContent){
		case 'Project': objectList = projects.collection; break;
		case 'Category': objectList = categories.collection; break;
	}

	let displayList = document.createElement('div');
	displayList.classList.add('tag-selection-list');

	for(let tagObject of objectList){
		let objectListing = document.createElemet('div');
		objectListing.tagObject = tagObject;
		objectListing.textContent = tagObject.title;
		objectListing.addEventListener('click', () => {
			selectedTag.listing.setAttribute('selected', false);
			objectListing.setAttribute('selected', true);
			selectedTag.listing = objectListing;
		});
		objectList.appendChild(objectListing);
	}

	return displayList;
}

function addTag(tag){
	let parentObject = document.querySelector('.window-title').activeObject;
	activeObject.tags.add(tag);
	document.querySelector('tag-container').prepend(displayTagItem(tag));
}


export{displayTags};
import {categories, projects} from './index.js';
import {createAddWindow} from './add-window-display.js';

//creates DOM structure for tag display
function displayTags(tags){
	let container = document.createElement('div');
	container.classList.add('tag-container');
	for(let tag of tags){
		container.appendChild(displayTagItem(tag));
	}

	container.appendChild(addTagButton());

	return container;
}

//creates DOM structure for tag item
function displayTagItem(tag){
	let tagDisplay = document.createElement('div');
	tagDisplay.classList.add('tag');
	tagDisplay.setAttribute('type', tag.tagType);

	let typeIcon = document.createElement('div');

	let titleDisplay = document.createElement('a');
	titleDisplay.textContent = tag.id.title || tag.id.contactName.first;
	titleDisplay.addEventListener('click', () => tag.id.display());

	tagDisplay.appendChild(typeIcon);
	tagDisplay.appendChild(titleDisplay);

	return tagDisplay;
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
	let receiverFunc = (current, selected) => {
		return {receiver: selected, item:current};
	}

	let addWindow = createAddWindow(receiverFunc);
	Object.assign(addWindow.typeSelectors, 
			{'Category': categories, 'Project': projects});
	/*Object.assign(addWindow.newItems,
			{'New Todo': todos, 'New Project': projects});*/

	addWindow.display();
}



/*function displayAddTagWindow(){
	let addTagWindowContainer = document.createElement('div');
	addTagWindowContainer.classList.add('popup-window-container');
	addTagWindowContainer.close = () => {
		document.querySelector('body').removeChild(addTagWindowContainer);
	}

	let addTagWindow = document.createElement('div');
	addTagWindow.classList.add('popup-window');
	addTagWindow.classList.add('add-tag-window');

	let closeButton = createCloseButton(addTagWindowContainer.close);

	let typeSelectContainer = document.createElement('div');
	typeSelectContainer.classList.add('type-select-container');

	addTagWindow.appendChild(closeButton);
	addTagWindow.appendChild(typeSelectContainer);
	addTagWindowContainer.appendChild(addTagWindow);
	document.querySelector('body').appendChild(addTagWindowContainer);
	displayTypeSelectWindow();
}*/
/*
function createCloseButton(closeFunction){
	let closeButton = document.createElement('div');
	closeButton.classList.add('close-button');
	closeButton.textContent = 'X';
	closeButton.addEventListener('click', closeFunction);

	return closeButton;
}

function displayTypeSelectWindow(){
	let categoryTypeSelect = createTypeSelectButton(categories),
		projectTypeSelect = createTypeSelectButton(projects);

	for(let button of [categoryTypeSelect, projectTypeSelect]){
		document.querySelector('.type-select-container').appendChild(button);
	}
}

function createTypeSelectButton(collection){
	let title = (collection === projects)? 'Project': 'Category';
	let button = document.createElement('button');
	button.textContent = title;
	button.classList.add('tag-type-select-button');
	button.addEventListener('click', ()   => {
		document.querySelector('.type-select-container').innerHTML = '';
		displayObjectSelectWindow(collection);
	});

	return button;
}

function displayObjectSelectWindow(collection){
	let selectedTag = {listing: null};

	let typeSelectContainer = document.querySelector('.type-select-container');
	typeSelectContainer.appendChild(
		displayTagObjectSelection(collection.collection, selectedTag));
	
	let container = document.querySelector('.add-tag-window');
	container.appendChild(createBackButton());
	container.appendChild(createSelectButton(selectedTag));
}

function createBackButton(){
	let container = document.querySelector('.add-tag-window');

	let backButton = document.createElement('button');
	backButton.classList.add('back-button');
	backButton.classList.add('add-tag-nav-button');
	backButton.textContent = 'Back';

	backButton.addEventListener('click', backToTypeSelect);

	return backButton;
}

function backToTypeSelect(){
	document.querySelector('.type-select-container').innerHTML = '';

	let container = document.querySelector('.add-tag-window');
	container.removeChild(document.querySelector('.back-button'));
	container.removeChild(document.querySelector('.select-button'));

	displayTypeSelectWindow();

}

function createSelectButton(selectedTag){
	let selectButton = document.createElement('button');
	selectButton.classList.add('select-button');
	selectButton.classList.add('add-tag-nav-button');
	selectButton.textContent = 'Select';

	selectButton.addEventListener('click', () => submitAddTag(selectedTag)); 

	return selectButton;
}

function submitAddTag(selectedTag){
	if(selectedTag.listing){
		addTag(selectedTag.listing.tagObject.createTag());
		document.querySelector('.popup-window-container').close();
	}	
}

function displayTagObjectSelection(objectSet, selectedTag){
	let displayList = document.createElement('div');
	displayList.classList.add('tag-selection-list');

	let parentObject = document.querySelector('.window-title').activeObject;
	let objectList = Array.from(objectSet)
						.filter(obj => !hasTag(parentObject, obj));

	objectList.map(obj => createTagListing(obj, displayList, selectedTag));

	return displayList;
}

function createTagListing(tagObject, displayList, selectedTag){
	let objectListing = document.createElement('div');
	objectListing.classList.add('tag-object-listing');
	objectListing.tagObject = tagObject;
	objectListing.textContent = tagObject.title;
	objectListing.addEventListener('click', () => selectListing(objectListing, selectedTag));
	displayList.appendChild(objectListing);

	return objectListing;
}

function selectListing(objectListing, selectedTag){
	if(selectedTag.listing){
		selectedTag.listing.setAttribute('selected', false);
	}
	objectListing.setAttribute('selected', true);
	selectedTag.listing = objectListing;
}

function addTag(tag){
	let parentObject = document.querySelector('.window-title').activeObject;
	if(hasTag(parentObject, tag.id)) return;
	tag.id.todoList.add(parentObject);
	document.querySelector('.tag-container').prepend(displayTagItem(tag));
}

function hasTag(parentObject, tagObject){
	if(tagObject === parentObject) return true;
	return parentObject.tags.list()
							.some(existingTag => {
								return existingTag.id === tagObject;
							});
}*/

export{displayTags};
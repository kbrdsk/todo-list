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

export{displayTags};
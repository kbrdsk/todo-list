import {displayProject} from './project.js';
import {displayCategory} from './category-display.js';
import {displayContactWindow} from './contact-display.js';

function displayTags(tags){
	let container = document.createElement('div');
	container.classList.add('tag-container');
	for(let tag of tags){
		container.appendChild(displayTagItem(tag));
	}

	return container;
}

function displayTagItem(tag){
	let tagDisplay = document.createElement('div');
	tagDisplay.classList.add('tag');
	tag.setAttribute('type', tag.tagType);

	let typeIcon = document.createElement('div');

	let titleDisplay = document.createElement('a');
	titleDisplay.textContent = tag.id.title;
	titlleDisplay.addEventListener('click', () => loadReferencedObject(tag));

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

export{displayTags};
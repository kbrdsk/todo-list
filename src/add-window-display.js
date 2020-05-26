function createAddWindow(receiverFunc){
	let typeSelectors = {},
		newItems = {};

	function display(){
		displayAddWindow();
		displayTypeSelectWindow();
	}

	function displayTypeSelectWindow(){
		for(let title in typeSelectors){
			let container = document.querySelector('.type-select-container');
			container.appendChild(createTypeSelectButton(typeSelectors[title], title));
		}

		for(let title in newItems){
			let container = document.querySelector('.new-item-container');
			container.appendChild(createNewItemButton(newItems[title], title));
		}
	}

	function createNewItemButton(collection, title){
		let button = document.createElement('button');
		button.classList.add('add-new-item-button');
		button.classList.add('type-select-button');
		button.textContent = title;
		button.addEventListener('click', () => addNewItem(collection.itemGenerator()));
	
		return button;
	}

	function addNewItem(selectedItem){
		let currentItem = document.querySelector('.window-title').activeObject;
		let receiver = receiverFunc(currentItem, selectedItem).receiver;
		let newItem = receiverFunc(currentItem, selectedItem).item;
		receiver.todoList.add(newItem);
		currentItem.display();
		document.querySelector('.popup-window-container').close();
	}

	function createSelectButton(selectedItem){
		let selectButton = document.createElement('button');
		selectButton.classList.add('select-button');
		selectButton.classList.add('add-nav-button');
		selectButton.textContent = 'Select';
	
		selectButton.addEventListener('click', () => submitAdd(selectedItem)); 
	
		return selectButton;
	}

	function submitAdd(selectedItem){
		if(selectedItem.listing){
			addNewItem(selectedItem.listing.itemObject);
		}	
	}

	function createTypeSelectButton(collection, title){
		let button = document.createElement('button');
		button.textContent = title;
		button.classList.add('type-select-button');
		button.addEventListener('click', ()   => {
			document.querySelector('.type-select-container').innerHTML = '';
			document.querySelector('.new-item-container').innerHTML = '';
			displayObjectSelectWindow(collection);
		});
	
		return button;
	}

	function displayObjectSelectWindow(collection){
		let selectedItem = {listing: null};
	
		let typeSelectContainer = document.querySelector('.type-select-container');
		typeSelectContainer.appendChild(
			displayObjectSelection(collection.collection, selectedItem));
		
		let container = document.querySelector('.add-window');
		container.appendChild(createBackButton());
		container.appendChild(createSelectButton(selectedItem));
	}
	
	function displayObjectSelection(objectSet, selectedItem){
		let displayList = document.createElement('div');
		displayList.classList.add('selection-list');
	
		let currentObject = document.querySelector('.window-title').activeObject;
		let parent = obj => receiverFunc(currentObject, obj).receiver;
		let item = obj => receiverFunc(currentObject, obj).item;
	
		let objectList = Array.from(objectSet)
							.filter(obj => !hasTodo(parent(obj), item(obj)));
	
		objectList.map(obj => createItemListing(obj, displayList, selectedItem));
	
		return displayList;
	}

	function createBackButton(){
		let container = document.querySelector('.add-window');
	
		let backButton = document.createElement('button');
		backButton.classList.add('back-button');
		backButton.classList.add('add-nav-button');
		backButton.textContent = 'Back';
	
		backButton.addEventListener('click', backToTypeSelect);
	
		return backButton;
	}
	
	function backToTypeSelect(){
		document.querySelector('.type-select-container').innerHTML = '';
	
		let container = document.querySelector('.add-window');
		container.removeChild(document.querySelector('.back-button'));
		container.removeChild(document.querySelector('.select-button'));
	
		displayTypeSelectWindow();
	
	}
	return {display, typeSelectors, newItems};
}


function displayAddWindow(){
	let addWindowContainer = document.createElement('div');
	addWindowContainer.classList.add('popup-window-container');
	addWindowContainer.close = () => {
		document.querySelector('body').removeChild(addWindowContainer);
	}

	let addWindow = document.createElement('div');
	addWindow.classList.add('popup-window');
	addWindow.classList.add('add-window');

	let closeButton = createCloseButton(addWindowContainer.close);

	let typeSelectContainer = document.createElement('div');
	typeSelectContainer.classList.add('type-select-container');

	let newItemContainer = document.createElement('div');
	newItemContainer.classList.add('new-item-container');

	addWindow.appendChild(closeButton);
	addWindow.appendChild(typeSelectContainer);
	addWindow.appendChild(newItemContainer);
	addWindowContainer.appendChild(addWindow);
	document.querySelector('body').appendChild(addWindowContainer);
}

function createCloseButton(closeFunction){
	let closeButton = document.createElement('div');
	closeButton.classList.add('close-button');
	closeButton.textContent = 'X';
	closeButton.addEventListener('click', closeFunction);

	return closeButton;
}

function createItemListing(itemObject, displayList, selectedTag){
	let objectListing = document.createElement('div');
	objectListing.classList.add('tag-object-listing');
	objectListing.itemObject = itemObject;
	objectListing.textContent = itemObject.title;
	objectListing.addEventListener('click', () => selectListing(objectListing, selectedTag));
	displayList.appendChild(objectListing);

	return objectListing;
}

function hasTodo(parentObject, itemObject){
	if(itemObject === parentObject) return true;
	return parentObject.todoList.list()
							.some(existingTodo => {
								return existingTodo === itemObject;
							});
}

function selectListing(objectListing, selectedItem){
	if(selectedItem.listing){
		selectedItem.listing.setAttribute('selected', false);
	}
	objectListing.setAttribute('selected', true);
	selectedItem.listing = objectListing;
}


export {createAddWindow};
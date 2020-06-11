import { projects, categories, todos, contacts } from "./index.js";

let nullListing = document.createElement("div");
nullListing.add = () => {};

function initializeAddWindow() {
	projects.newItemInfoFields = function () {
		return {
			title: document.createElement("input"),
			description: document.createElement("textarea"),
		};
	};

	categories.newItemInfoFields = function () {
		return { title: document.createElement("input") };
	};

	todos.newItemInfoFields = function () {
		return {
			title: document.createElement("input"),
			description: document.createElement("textarea"),
		};
	};

	contacts.newItemInfoFields = function () {
		return {
			first: document.createElement("input"),
			last: document.createElement("input"),
			phone: document.createElement("input"),
			email: document.createElement("input"),
			organization: document.createElement("input"),
		};
	};
}

function createAddWindow(receiverFunc) {
	let typeSelectors = {},
		newItems = {};

	let addWindow = { display, typeSelectors, newItems, receiverFunc };

	function display() {
		let displayContainer = createPopup();
		let backButton = createBackButton(backToTypeSelect(addWindow));
		addWindow.backButton = backButton;
		let typeSelect = createTypeSelect(typeSelectors, addWindow);
		let newItemSelect = createNewItemSelect(newItems, addWindow);
		document.querySelector("body").appendChild(displayContainer);
		displayTypeSelectWindow(
			typeSelect,
			newItemSelect,
			document.querySelector(".add-window")
		);
	}

	return addWindow;
}

function createPopup() {
	let addWindowContainer = document.createElement("div");
	addWindowContainer.classList.add("popup-window-container");
	addWindowContainer.close = () => {
		document.querySelector("body").removeChild(addWindowContainer);
	};

	let addWindow = document.createElement("div");
	addWindow.classList.add("popup-window");
	addWindow.classList.add("add-window");

	let closeButton = createCloseButton(addWindowContainer.close);

	addWindow.appendChild(closeButton);
	addWindowContainer.appendChild(addWindow);

	return addWindowContainer;
}

function createCloseButton(closeFunction) {
	let closeButton = document.createElement("div");
	closeButton.classList.add("close-button");
	closeButton.textContent = "X";
	closeButton.addEventListener("click", closeFunction);

	return closeButton;
}

function createTypeSelect(typeSelectors, addWindow) {
	let typeSelectContainer = document.createElement("div");
	typeSelectContainer.classList.add("type-select-container");
	for (let title in typeSelectors) {
		typeSelectContainer.appendChild(
			createTypeSelectButton(typeSelectors[title], title, addWindow)
		);
	}

	return typeSelectContainer;
}

function createNewItemSelect(newItemSelectors, addWindow) {
	let newItemContainer = document.createElement("div");
	newItemContainer.classList.add("new-item-container");
	for (let title in newItemSelectors) {
		newItemContainer.appendChild(
			createNewItemButton(newItemSelectors[title], title, addWindow)
		);
	}

	return newItemContainer;
}

function displayTypeSelectWindow(typeSelect, newItemSelect, container) {
	container.appendChild(typeSelect);
	container.appendChild(newItemSelect);
}

function createTypeSelectButton(collection, title, addWindow) {
	let button = document.createElement("button");
	button.textContent = title;
	button.classList.add("type-select-button");
	button.addEventListener("click", () => {
		document.querySelector(".type-select-container").innerHTML = "";
		document.querySelector(".new-item-container").innerHTML = "";
		displayObjectSelectWindow(collection, addWindow);
	});

	return button;
}

function displayObjectSelectWindow(collection, addWindow) {
	let selectedItem = { listing: nullListing };

	let container = document.querySelector(".add-window");
	container.appendChild(
		displayObjectSelection(
			collection.collection,
			selectedItem,
			addWindow.receiverFunc
		)
	);
	container.appendChild(
		createObjectSelectNavContainer(addWindow, selectedItem)
	);
}

function createObjectSelectNavContainer(addWindow, selectedItem) {
	let navContainer = document.createElement("div");
	navContainer.classList.add("add-nav-container");
	navContainer.appendChild(addWindow.backButton);
	navContainer.appendChild(createSelectButton(selectedItem));

	return navContainer;
}

function displayObjectSelection(objectSet, selectedItem, receiverFunc) {
	let displayList = document.createElement("div");
	displayList.classList.add("selection-list");

	let currentObject = document.querySelector(".window-title").activeObject;
	let parent = (obj) => receiverFunc(currentObject, obj).receiver;
	let item = (obj) => receiverFunc(currentObject, obj).item;

	let objectList = Array.from(objectSet).filter((obj) =>
		isAddableObject(parent(obj), item(obj))
	);

	let listings = objectList.map((obj) =>
		createItemListing(obj, selectedItem, receiverFunc)
	);
	for (let listing of listings) {
		displayList.appendChild(listing);
	}
	return displayList;
}

function createItemListing(itemObject, selectedTag, receiverFunc) {
	let objectListing = document.createElement("div");
	objectListing.classList.add("tag-object-listing");
	objectListing.itemObject = itemObject;
	if (itemObject.contactName)
		objectListing.textContent = `${itemObject.contactName.last}, ${itemObject.contactName.first}`;
	else objectListing.textContent = itemObject.title;
	objectListing.addEventListener("click", () =>
		selectListing(objectListing, selectedTag)
	);
	objectListing.add = () => addItem(itemObject, receiverFunc);

	return objectListing;
}

function selectListing(objectListing, selectedItem) {
	if (selectedItem.listing) {
		selectedItem.listing.setAttribute("selected", false);
	}
	objectListing.setAttribute("selected", true);
	selectedItem.listing = objectListing;
}

function addItem(selectedItem, receiverFunc) {
	let currentItem = document.querySelector(".window-title").activeObject;
	let receiver = receiverFunc(currentItem, selectedItem).receiver;
	let newItem = receiverFunc(currentItem, selectedItem).item;
	receiver.todoList.add(newItem);
}

function refreshDisplay(showContacts) {
	let currentItem = document.querySelector(".window-title").activeObject;
	currentItem.display();
	if (showContacts) {
		toggleContactDisplay();
	}
}

function toggleContactDisplay() {
	let main = document.querySelector("main");
	main.displayingContacts = !main.displayingContacts;
	main.setAttribute("displaying-contacts", main.displayingContacts);
}

function createSelectButton(selectedItem) {
	let selectButton = document.createElement("button");
	selectButton.classList.add("select-button");
	selectButton.classList.add("add-nav-button");
	selectButton.textContent = "Select";

	selectButton.addEventListener("click", () => submitAdd(selectedItem));

	return selectButton;
}

function submitAdd(selectedItem) {
	selectedItem.listing.add();
	document.querySelector(".popup-window-container").close();
	let tagCreator = selectedItem.listing.itemObject.createTag;
	let showContacts =
		tagCreator && tagCreator().tagType === "contact";
	refreshDisplay(showContacts);
}

function submitNewItem(collection, infoFields, receiverFunc) {
	let newItem = createNewItem(collection, infoFields);
	addItem(newItem, receiverFunc);
	document.querySelector(".popup-window-container").close();
	refreshDisplay(collection === contacts);
}

function createNewItem(collection, infoFields) {
	let newItem = collection.itemGenerator();
	for (let field in infoFields) {
		if (field === "first" || field === "last") {
			newItem.contactName[field] = infoFields[field].value;
		} else newItem[field] = infoFields[field].value;
	}

	return newItem;
}

function isAddableObject(parent, item) {
	let looping = false;
	if (
		item.createTag &&
		item.createTag().tagType === "project" &&
		parent.createTag().tagType === "project"
	) {
		looping = parent.isChild(item);
	}
	return !looping && !hasTodo(parent, item);
}

function createNewItemButton(collection, title, addWindow) {
	let button = document.createElement("button");
	button.classList.add("add-new-item-button");
	button.classList.add("type-select-button");
	button.textContent = title;
	button.addEventListener("click", () =>
		displayNewItemWindow(collection, addWindow)
	);

	return button;
}

function displayNewItemWindow(collection, addWindow) {
	let infoFields = collection.newItemInfoFields();

	let container = document.querySelector(".add-window");

	container.removeChild(container.querySelector(".type-select-container"));
	container.removeChild(container.querySelector(".new-item-container"));

	for (let field in infoFields) {
		container.appendChild(createInfoField(field, infoFields[field]));
	}

	let navContainer = document.createElement("div");
	navContainer.classList.add("add-nav-container");
	navContainer.appendChild(createBackButton());
	navContainer.appendChild(
		createDoneButton(() =>
			submitNewItem(collection, infoFields, addWindow.receiverFunc)
		)
	);

	container.appendChild(navContainer);
}

function createBackButton(backFunction) {
	let backButton = document.createElement("button");
	backButton.classList.add("back-button");
	backButton.classList.add("add-nav-button");
	backButton.textContent = "Back";

	backButton.addEventListener("click", backFunction);

	return backButton;
}

function backToTypeSelect(addWindow) {
	return () => {
		document.querySelector(".popup-window-container").close();
		addWindow.display();
	};
}

function createDoneButton(submitFunction) {
	let button = document.createElement("button");
	button.textContent = "Done";
	button.classList.add("new-item-done-button");
	button.classList.add("add-nav-button");
	button.addEventListener("click", submitFunction);

	return button;
}

function hasTodo(parentObject, itemObject) {
	if (itemObject === parentObject) return true;
	return parentObject.todoList.list().some((existingTodo) => {
		return existingTodo === itemObject;
	});
}

function displayNewCollectionItemWindow(collection) {
	let receiverFunc = () => {
		return { receiver: { todoList: { add: () => {} } }, item: {} };
	};
	let addWindow = createAddWindow(receiverFunc);
	addWindow.display();

	let infoFields = collection.newItemInfoFields();

	let container = document.querySelector(".add-window");

	container.removeChild(container.querySelector(".type-select-container"));
	container.removeChild(container.querySelector(".new-item-container"));

	for (let field in infoFields) {
		container.appendChild(createInfoField(field, infoFields[field]));
	}

	container.appendChild(
		createDoneButton(() =>
			submitNewItem(collection, infoFields, addWindow.receiverFunc)
		)
	);
}

function createInfoField(fieldName, input) {
	let infoFieldName = document.createElement("span");
	infoFieldName.textContent = fieldName;
	infoFieldName.classList.add("add-info-field-name");

	input.classList.add("add-info-field-input");

	let infoFieldContainer = document.createElement("div");
	infoFieldContainer.classList.add("add-info-field-container");

	infoFieldContainer.appendChild(infoFieldName);
	infoFieldContainer.appendChild(input);

	return infoFieldContainer;
}

export { createAddWindow, initializeAddWindow, displayNewCollectionItemWindow };

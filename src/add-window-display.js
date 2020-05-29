import { projects, categories, todos, contacts } from "./index.js";

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

	function display() {
		displayAddWindow();
		displayTypeSelectWindow();
	}

	function displayTypeSelectWindow() {
		for (let title in typeSelectors) {
			let container = document.querySelector(".type-select-container");
			container.appendChild(
				createTypeSelectButton(typeSelectors[title], title)
			);
		}

		for (let title in newItems) {
			let container = document.querySelector(".new-item-container");
			container.appendChild(createNewItemButton(newItems[title], title));
		}
	}

	function createNewItemButton(collection, title) {
		let button = document.createElement("button");
		button.classList.add("add-new-item-button");
		button.classList.add("type-select-button");
		button.textContent = title;
		button.addEventListener("click", () => displayNewItemWindow(collection));

		return button;
	}

	function addNewItem(selectedItem) {
		let currentItem = document.querySelector(".window-title").activeObject;
		let receiver = receiverFunc(currentItem, selectedItem).receiver;
		let newItem = receiverFunc(currentItem, selectedItem).item;
		receiver.todoList.add(newItem);
		currentItem.display();
		if (
			selectedItem.createTag &&
			selectedItem.createTag().tagType === "contact"
		) {
			let main = document.querySelector("main");
			main.displayingContacts = !main.displayingContacts;
			main.setAttribute("displaying-contacts", main.displayingContacts);
		}
		document.querySelector(".popup-window-container").close();
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
		if (selectedItem.listing) {
			addNewItem(selectedItem.listing.itemObject);
		}
	}

	function createTypeSelectButton(collection, title) {
		let button = document.createElement("button");
		button.textContent = title;
		button.classList.add("type-select-button");
		button.addEventListener("click", () => {
			document.querySelector(".type-select-container").innerHTML = "";
			document.querySelector(".new-item-container").innerHTML = "";
			displayObjectSelectWindow(collection);
		});

		return button;
	}

	function displayNewItemWindow(collection) {
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
		navContainer.appendChild(createDoneButton(collection, infoFields));

		container.appendChild(navContainer);
	}

	function createDoneButton(collection, infoFields) {
		let button = document.createElement("button");
		button.textContent = "Done";
		button.classList.add("new-item-done-button");
		button.classList.add("add-nav-button");
		button.addEventListener("click", () =>
			submitNewItem(collection, infoFields)
		);

		return button;
	}

	function submitNewItem(collection, infoFields) {
		let newItem = collection.itemGenerator();
		for (let field in infoFields) {
			if (field === "first" || field === "last") {
				newItem.contactName[field] = infoFields[field].value;
			} else newItem[field] = infoFields[field].value;
		}
		addNewItem(newItem);
	}

	function displayObjectSelectWindow(collection) {
		let selectedItem = { listing: null };

		let navContainer = document.createElement("div");
		navContainer.classList.add("add-nav-connavContainer");
		navContainer.appendChild(createBackButton());
		navContainer.appendChild(createSelectButton(selectedItem));

		let container = document.querySelector(".add-window");
		container.appendChild(
			displayObjectSelection(collection.collection, selectedItem)
		);
		container.appendChild(navContainer);
	}

	function displayObjectSelection(objectSet, selectedItem) {
		let displayList = document.createElement("div");
		displayList.classList.add("selection-list");

		let currentObject = document.querySelector(".window-title").activeObject;
		let parent = (obj) => receiverFunc(currentObject, obj).receiver;
		let item = (obj) => receiverFunc(currentObject, obj).item;

		let objectList = Array.from(objectSet).filter((obj) =>
			addableObject(parent(obj), item(obj))
		);

		objectList.map((obj) => createItemListing(obj, displayList, selectedItem));

		return displayList;
	}

	function addableObject(parent, item) {
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

	function createBackButton() {
		let backButton = document.createElement("button");
		backButton.classList.add("back-button");
		backButton.classList.add("add-nav-button");
		backButton.textContent = "Back";

		backButton.addEventListener("click", backToTypeSelect);

		return backButton;
	}

	function backToTypeSelect() {
		document.querySelector(".popup-window-container").close();
		display();
	}
	return { display, typeSelectors, newItems };
}

function displayAddWindow() {
	let addWindowContainer = document.createElement("div");
	addWindowContainer.classList.add("popup-window-container");
	addWindowContainer.close = () => {
		document.querySelector("body").removeChild(addWindowContainer);
	};

	let addWindow = document.createElement("div");
	addWindow.classList.add("popup-window");
	addWindow.classList.add("add-window");

	let closeButton = createCloseButton(addWindowContainer.close);

	let typeSelectContainer = document.createElement("div");
	typeSelectContainer.classList.add("type-select-container");

	let newItemContainer = document.createElement("div");
	newItemContainer.classList.add("new-item-container");

	addWindow.appendChild(closeButton);
	addWindow.appendChild(typeSelectContainer);
	addWindow.appendChild(newItemContainer);
	addWindowContainer.appendChild(addWindow);
	document.querySelector("body").appendChild(addWindowContainer);
}

function createCloseButton(closeFunction) {
	let closeButton = document.createElement("div");
	closeButton.classList.add("close-button");
	closeButton.textContent = "X";
	closeButton.addEventListener("click", closeFunction);

	return closeButton;
}

function createItemListing(itemObject, displayList, selectedTag) {
	let objectListing = document.createElement("div");
	objectListing.classList.add("tag-object-listing");
	objectListing.itemObject = itemObject;
	if (itemObject.contactName)
		objectListing.textContent = `${itemObject.contactName.last}, ${itemObject.contactName.first}`;
	else objectListing.textContent = itemObject.title;
	objectListing.addEventListener("click", () =>
		selectListing(objectListing, selectedTag)
	);
	displayList.appendChild(objectListing);

	return objectListing;
}

function hasTodo(parentObject, itemObject) {
	if (itemObject === parentObject) return true;
	return parentObject.todoList.list().some((existingTodo) => {
		return existingTodo === itemObject;
	});
}

function selectListing(objectListing, selectedItem) {
	if (selectedItem.listing) {
		selectedItem.listing.setAttribute("selected", false);
	}
	objectListing.setAttribute("selected", true);
	selectedItem.listing = objectListing;
}

function displayNewCollectionItemWindow(collection) {
	displayAddWindow();
	let infoFields = collection.newItemInfoFields();

	let addWindow = document.querySelector(".add-window");

	document.querySelector(".type-select-container").innerHTML = "";
	document.querySelector(".new-item-container").innerHTML = "";

	for (let field in infoFields) {
		addWindow.appendChild(createInfoField(field, infoFields[field]));
	}

	let container = document.querySelector(".add-window");
	container.appendChild(createDoneButton(collection, infoFields));
}

function createDoneButton(collection, infoFields) {
	let button = document.createElement("button");
	button.textContent = "Done";
	button.classList.add("new-item-done-button");
	button.classList.add("add-nav-button");
	button.addEventListener("click", () => submitNewItem(collection, infoFields));

	return button;
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

function submitNewItem(collection, infoFields) {
	let newItem = collection.itemGenerator();
	for (let field in infoFields) {
		if (field === "first" || field === "last") {
			newItem.contactName[field] = infoFields[field].value;
		} else newItem[field] = infoFields[field].value;
	}
	document.querySelector(".popup-window-container").close();
	collection.display();
}

export { createAddWindow, initializeAddWindow, displayNewCollectionItemWindow };

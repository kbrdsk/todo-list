function displayCollection(collection) {
	stopEditMode();
	let itemSet = collection.collection;
	let main = document.querySelector("main");
	let tagContainer = document.querySelector(".tag-display-container");

	tagContainer.innerHTML = "";

	main.setAttribute("displaying", "collection");
	document.querySelector("body").toggleEditing = toggleCollectionEdit;

	for (let item of itemSet) {
		main.appendChild(displayItem(item));
	}

	for (let displayItem of document.getElementsByClassName(
		"collection-item-display"
	)) {
		displayItem.appendChild(deleteButton(displayItem, collection));
	}

	let addButton = createAddButton(collection);
	main.appendChild(addButton);
}

function createAddButton(collection) {
	let addButton = document.createElement("button");
	addButton.classList.add("add-button");
	addButton.textContent = "+";
	addButton.addEventListener("click", () => addItem(collection));

	return addButton;
}

function addItem(collection) {
	let main = document.querySelector("main");
	let newItem = collection.itemGenerator();
	collection.collection.add(newItem);
	main.appendChild(displayItem(newItem));
}

function displayItem(item) {
	let itemDisplay = document.createElement("div");
	itemDisplay.classList.add("collection-item-display");
	itemDisplay.item = item;
	itemDisplay.setAttribute("type", item.createTag().tagType);

	let title = document.createElement("h3");
	title.classList.add("collection-item-title");
	title.textContent = item.title;
	title.addEventListener("click", () => item.display());

	let preview = document.createElement("p");
	preview.classList.add("collection-item-preview");
	preview.textContent = item.description;

	let favorite = document.createElement("button");
	favorite.classList.add("collection-item-favorite");
	favorite.setAttribute("is-favorite", item.favorite);
	favorite.addEventListener("click", (e) => toggleFavorite(e.target, item));

	let header = document.createElement("header");
	header.classList.add("collection-item-header");

	header.appendChild(title);
	header.appendChild(favorite);

	itemDisplay.appendChild(header);
	itemDisplay.appendChild(preview);

	return itemDisplay;
}

function toggleFavorite(display, item) {
	item.favorite = !item.favorite;
	display.setAttribute("is-favorite", item.favorite);
}

function toggleCollectionEdit() {
	let body = document.querySelector("body");
	if (body.editing) stopEditMode();
	else if (!body.editing) startEditMode();
}

function startEditMode() {
	let body = document.querySelector("body");
	body.editing = true;
	body.setAttribute("editing", true);
}

function stopEditMode() {
	let body = document.querySelector("body");
	body.editing = false;
	body.setAttribute("editing", false);
}

function deleteButton(listing, collection) {
	let button = document.createElement("button");
	button.classList.add("collection-item-delete-button");
	button.textContent = "Delete";
	button.addEventListener("click", () => deleteListing(listing, collection));

	return button;
}

function deleteListing(listing, collection) {
	collection.delete(listing.item);
	document.querySelector("main").removeChild(listing);
}

export { displayCollection };

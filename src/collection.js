function displayCollection(main, collection){
	let itemSet = collection.collection;

	main.setAttribute('displaying', 'collection');

	for(let item of itemSet){
		main.appendChild(displayItem(item));
	}

	let addButton = createAddButton(main, collection);
	main.appendChild(addButton);
}

function createAddButton(main, collection){
	let addButton = document.createElement('button');
	addButton.classList.add('add-button');
	addButton.textContent = '+';
	addButton.addEventListener('click', () => addItem(main, collection));

	return addButton;
}

function addItem(main, collection){
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

	let preview = document.createElement('p');
	preview.classList.add('collection-item-preview');

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

function toggleFavorite(display, item){
	item.favorite = !item.favorite;
	display.setAttribute('is-favorite', item.favorite);
}

function createCollection(itemGenerator){
	let collection = new Set();
	return {collection, itemGenerator};
}

export {displayCollection, createCollection};
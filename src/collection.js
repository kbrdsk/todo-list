function createCollection(itemGenerator){
	let collection = new Set();
	let extendedGenerator = (...args) => {
		let newItem = itemGenerator(...args);
		newItem.storageId = createStorageId();
		collection.add(newItem);
		return newItem;
	}
	return {collection, itemGenerator: extendedGenerator};
}

function createStorageId(){
	return Date.now();
}

export {createCollection};
function createCollection(itemGenerator){
	let collection = new Set();
	let extendedGenerator = (...args) => {
		let newItem = itemGenerator(...args);
		newItem.storageId = createStorageId();
		collection.add(newItem);
		return newItem;
	}
	return {collection, itemGenerator: extendedGenerator, delete: deleteItem};
}

function createStorageId(){
	return Date.now();
}

function deleteItem(item){
	if(item.tags){
		for(let tag of item.tags.list()) removeFromTags(tag, item);
	}
	if(item.todoList){
		for(let todoItem of item.todoList.list()) removeFromTodoList(todoItem, item);
	}
	this.collection.delete(item);
}

function removeFromTodoList(todoItem, parentItem){
	parentItem.todoList.remove(todoItem);
	let tag = todoItem.tags.list().find(tag => tag.id === parentItem);
	todoItem.tags.remove(tag);
}

function removeFromTags(tagItem, childItem){
	childItem.tags.remove(tagItem);
	let todoItem = tagItem.id.todoList.list().find(item => item === childItem);
	tagItem.id.todoList.remove(todoItem);
}

export {createCollection};
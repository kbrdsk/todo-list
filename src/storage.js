import {todos, projects, categories, contacts} from './index.js';

function save(){
	let collectionsArray = [todos, projects, categories, contacts];
	let packedArray = collectionsArray.map(packCollection);
	let dataString = JSON.stringify(packedArray);
	localStorage.todoDataString = dataString;
	console.log('Saved');
}

function packCollection(collection){
	let packedObjects = Array.from(collection.collection)
							.map(obj => packObject(obj, collection));
	return packedObjects;
}

function packObject(todoListObject){
	let packedObject = Object.assign({}, todoListObject);
	if(todoListObject.todoList){
		packedObject.todoListStorageData = todoListObject.todoList.list()
												   .map(todo => todo.storageId);
	}

	for(let packedProperty of ['todoList', 'tags', 'dueDate', 'scheduleDate', 'createTag']){
		delete packedObject[packedProperty];
	}

	return packedObject;
}


function initializeStorage(){
}

function loadTodoList(loadingObject, todoObjectArray){
	for(let storageId of loadingObject.todoListStorageData){
		let todoObject = todoObjectArray.find(obj => obj.storageId === storageId);
		loadingObject.todoList.add(todoObject);
	}
}

function loadObject(dataObject, collection){
	let object = collection.itemGenerator();
	Object.assign(object, dataObject);
}

function load(dataString){
	if(!dataString) return;

	let dataArray = JSON.parse(dataString);

	dataArray[0].map(obj => loadObject(obj, todos));
	dataArray[1].map(obj => loadObject(obj, projects));
	dataArray[2].map(obj => loadObject(obj, categories));
	dataArray[3].map(obj => loadObject(obj, contacts));

	let todoObjectArray = [...Array.from(todos.collection), ...Array.from(projects.collection)];

	for(let collection of [projects, categories, contacts]){
		Array.from(collection.collection).map(obj => loadTodoList(obj, todoObjectArray));
	}
}

export {save, load, initializeStorage};
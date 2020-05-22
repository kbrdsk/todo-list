import {todos, projects, categories, contacts} from './index.js';

function save(){
	let collectionsArray = [todos, projects, categories, contacts];
	let packedArray = collectionsArray.map(packCollection);
	let dataString = JSON.stringify(packedArray);
	console.log(dataString);
}

function packCollection(collection){
	let packedObjects = Array.from(collection.collection);
	if(collection !== todos){
		packedObjects = packedObjects.map(obj => packObject(obj, collection));
	} 
	return packedObjects;
}

function packObject(todoListObject){
	let packedObject = Object.assign({}, todoListObject);
	packedObject.todoListStorageData = todoListObject.todoList.list()
												   .map(todo => todo.storageId);
	return packedObject;
}


function initializeStorage(){
	todos.readyFields = ['title', 'description', 'todoListStorageData', 'storageId'];
	projects.readyFields = ['title', 'description', 'todoListStorageData', 'storageId'];
	categories.readyFields =['title', 'description', 'todoListStorageData', 'storageId'];
	contacts.readyFields = [];
}

function loadTodoList(loadingObject, todoObjectArray){
	for(let storageId of loadingObject.todoListStorageData){
		let todoObject = todoObjectArray.find(obj => obj.storageId === storageId);
		loadingObject.todoList.add(todoObject);
	}
}

function loadObject(dataObject, collection){
	let object = collection.itemGenerator();
	for(let field of collection.readyFields){
		object[field] = dataObject[field];
	};
}

function load(dataString){
	let dataArray = JSON.parse(dataString);
	console.log(dataArray);

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
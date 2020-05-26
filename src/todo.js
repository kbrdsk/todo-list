let isDate = require('date-fns/isDate');

function todo(todoName = 'New Todo'){
	let title = todoName,
		description = '',
		urgency = 0,
		isDone = false,
		dueDate = todoDate(),
		scheduleDate = todoDate(),
		tags = tagList();

	let todoObj = Object.create(todo.proto);
	Object.assign(
		todoObj, 
		{
			title, 
			description, 
			isDone,
			urgency,
			dueDate, 
			scheduleDate, 
			tags,
		}
	);

	return todoObj;
}

todo.proto = {};

function project(projectName = 'New Project'){
	let proto = Object.assign(project.proto, {isChild});
	let projectObj = Object.create(proto);

	let title = projectName,
		description = '',
		favorite = false,
		urgency = 0,
		isDone = false,
		dueDate = todoDate(),
		scheduleDate = todoDate(),
		tags = tagList(),
		_todoList = createTodoList(projectObj),
		todoList = Object.create(_todoList),
		createTag = tagGenerator('project').bind(projectObj);

	todoList.add = (proj) => {
		if(Object.getPrototypeOf(proj) === project.proto
			&& projectObj.isChild(proj)){
			throw 'Looping projects';
		} 
		_todoList.add(proj);
	}

	function isChild(project){	
		let projects = this.tags.list().filter(tag => tag.tagType === 'project');
		if(!projects) return false;
		if(projects.some(proj => proj.id === project)) return true;
		if(projects.some(proj => proj.id.isChild(project))) return true;
		return false;
	}

	Object.assign(
		projectObj, 
		{
			title, 
			description, 
			favorite,
			isDone,
			urgency,
			dueDate, 
			scheduleDate, 
			tags,
			todoList,
			createTag,
		}
	);

	return projectObj;
}

project.proto = {};

function contact(first = 'New', last = 'Contact'){
	let contactObj = Object.create(contact.proto);

	let contactName = {first, last},
		email = '',
		phone = '',
		organization = '',
		favorite = false,
		tags = tagList(),
		todoList = createTodoList(contactObj),
		createTag = tagGenerator('contact').bind(contactObj);

	Object.assign(
		contactObj, 
		{
			contactName,
			email,
			phone,
			organization,
			favorite,
			tags,
			todoList,
			createTag,
		}
	);

	return contactObj;
}

contact.proto = {};

function category(categoryName = 'New Category'){
	let categoryObj = Object.create(category.proto);

	let title = categoryName,
		favorite = false,
		todoList = createTodoList(categoryObj),
		createTag = tagGenerator('category').bind(categoryObj);

	Object.assign(
		categoryObj, 
		{
			title,
			favorite,
			todoList,
			createTag,
		}
	);

	return categoryObj;
}

category.proto = {};

function createTodoList(creatingObj){
	let todos = [];

	let add = (todoItem) => {
		if(todos.includes(todoItem)) return;
		todoItem.tags.add(creatingObj.createTag());
		todos.push(todoItem);
	}

	let remove = (todoItem) => {
		if(todos.includes(todoItem)){
			let index = todos.indexOf(todoItem);
			todos = [...todos.slice(0, index), ...todos.slice(index + 1)];
		}
	}

	let place = (todoItem, index) => {
		if(todos.includes(todoItem)) return;
		todos = [...todos.slice(0, index), todoItem, ...todos.slice(index)];
	}

	let sort = () => {
		todos.sort(todoUrgencySort);
	}

	let list = () => Array.from(todos);

	return {list, add, remove, place, sort};
}

function todoUrgencySort(todo1, todo2){
	if(todo1.urgency < todo2.urgency) return 1;
	if(todo1.urgency > todo2.urgency) return -1;
	return 0;
}

function todoDate(){
	let date = null;

	let get = () => date;

	let set = (setDate) => {
		if(!isDate(setDate)) throw 'Must enter a vlid Date';
		date = setDate;
	}

	let remove = () => {
		date = null;
	}
}

function tagList(tagType){
	let tags = new Set();

	let add = (tag) => {
		tags.add(tag);
	};

	let remove = (tag) => {
		tags.delete(tag);
	};

	let clear = () => {
		tags = new Set();
	}

	let list = () => {
		return Array.from(tags);
	};

	return {list, add, remove};
}

function tagGenerator(tagType){
	return function (){
		return {tagType, id: this};
	}
}





export {todo, project, contact, category};
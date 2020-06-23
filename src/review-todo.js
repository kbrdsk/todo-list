let isDate = require("date-fns/isDate");

function Todo(name = "New Todo") {
	this.title = name;
	this.description = "";
	this.urgency = 0;
	this.isDone = false;
	this.dueDate = new TodoDate();
	this.scheduleDate = new TodoDate();
	this.tags = new TagList();
}

function Project(name = "New Project") {
	this.title = name;
	this.description = "";
	this.favorite = false;
	this.urgency = 0;
	this.isDone = false;
	this.dueDate = new TodoDate();
	this.scheduleDate = new TodoDate();
	this.tags = new TagList();
	this._todoList = createTodoList(this);
	this.todoList = Object.create(this._todoList);
	this.createTag = tagGenerator("project").bind(this);

	this.todoList.add = function (item) {
		if (isOwnParent.call(this, item)) {
			throw "Looping projects";
		}
		this._todoList.add(item);
	};
}

Project.prototype = {
	isChild(project) {
		let parentProjects = this.tags
			.list()
			.filter((tag) => tag.tagType === "project");
		return (
			!!parentProjects &&
			(isDirectChild(project, parentProjects) ||
				isDescendant(project, parentProjects))
		);
	},
};

function isDirectChild(project, parents) {
	return parents.some((proj) => proj.obj === project);
}

function isDescendant(project, parents) {
	return parents.some((proj) => proj.obj.isChild(project));
}

function isOwnParent(item) {
	return (
		Object.getPrototypeOf(item) === Project.prototype && this.isChild(item)
	);
}

function Contact(first = "New", last = "Contact") {
	this.contactName = { first, last };
	this.email = "";
	this.phone = "";
	this.organization = "";
	this.favorite = false;
	this.tags = new TagList();
	this.todoList = createTodoList(this);
	this.createTag = tagGenerator("contact").bind(this);
}

function Category(categoryName = "New Category") {
	this.title = categoryName;
	this.favorite = false;
	this.todoList = createTodoList(this);
	this.createTag = tagGenerator("category").bind(this);
}

function createTodoList(creatingObj) {
	let todos = [];

	let add = (todoItem) => {
		if (todos.includes(todoItem)) return;
		todoItem.tags.add(creatingObj.createTag());
		todos.push(todoItem);
	};

	let remove = (todoItem) => {
		if (todos.includes(todoItem)) {
			let index = todos.indexOf(todoItem);
			todos = [...todos.slice(0, index), ...todos.slice(index + 1)];
		}

		let tag = todoItem.tags.list().find((tag) => tag.obj === creatingObj);
		todoItem.tags.remove(tag);
	};

	let place = (todoItem, index) => {
		if (todos.includes(todoItem)) return;
		todos = [...todos.slice(0, index), todoItem, ...todos.slice(index)];
	};

	let sort = () => {
		todos.sort(todoUrgencySort);
	};

	let list = () => Array.from(todos);

	return { list, add, remove, place, sort };
}

function todoUrgencySort(todo1, todo2) {
	if (todo1.urgency < todo2.urgency) return 1;
	if (todo1.urgency > todo2.urgency) return -1;
	return 0;
}

function TodoDate() {
	let date = null;

	Object.defineProperties(this, {
		date: {
			get: function () {
				return date;
			},
			set: function (setDate) {
				if (!isDate(setDate)) throw "Must enter a valid Date";
				date = setDate;
			},
		},
	});

	this.remove = () => {
		date = null;
	};
}

function TagList() {
	this.tags = new Set();

	this.add = function (tag) {
		this.tags.add(tag);
	};

	this.remove = function (tag) {
		this.tags.delete(tag);
	};

	this.clear = function () {
		this.tags = new Set();
	};

	this.list = function () {
		return Array.from(this.tags);
	};
}

function tagGenerator(tagType) {
	return function () {
		return { tagType, obj: this };
	};
}

export { Todo, Project, Contact, Category };

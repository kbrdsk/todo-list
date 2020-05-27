function toggleEdit() {
	let body = document.querySelector("body");
	if (body.editing) stopEdit();
	else if (!body.editing) startEdit();
}

function startEdit() {
	let body = document.querySelector("body");
	body.editing = true;
	body.setAttribute("editing", true);
}

function stopEdit() {
	let body = document.querySelector("body");
	body.editing = false;
	body.setAttribute("editing", false);
}

export {toggleEdit, startEdit, stopEdit};
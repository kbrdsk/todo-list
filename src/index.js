import {todo, project} from './todo.js';

let proj1 = project('p1'),
	proj2 = project('p2');

proj1.todoList.add(proj2);
proj2.todoList.add(proj1);
//blech
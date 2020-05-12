import {createAddButton} from './index.js';
import {displayContactWindow} from './contact-display.js';

function displayContacts(contactList){
	let main = document.querySelector('main');
	main.innerHTML = '';
	main.setAttribute('displaying', 'contact');

	let contactsContainer = document.createElement('div');
	contactsContainer.classList.add('contacts-container');
	for(let contact of contactList.collection){
		contactsContainer.appendChild(displayContact(contact));
	}
	main.appendChild(contactsContainer);
	main.appendChild(createAddButton(addContact(contactList)));
}

function displayContact(contact){
	let listing = document.createElement('div');
	listing.classList.add('contact-listing');

	let name = document.createElement('a');
	name.textContent = contact.contactName.last +
					', ' + 
					contact.contactName.first;
	name.addEventListener('click', () => displayContactWindow(contact));

	listing.appendChild(name);

	return listing;
}

function addContact(contactList){
	return () => {
		contactList.collection.add(contactList.itemGenerator());
		displayContacts(contactList);
	}
}

export {displayContacts};
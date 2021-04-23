const bookContainer = document.querySelector('.book-container');
const closeBtn = document.getElementById('close-form');
const formDiv = document.querySelector(".form-wrapper");
const newbookBtn = document.getElementById('newbtn');
const submitBtn = document.querySelector('.add-book');
const titleField = document.getElementById('Title');
const authorField = document.getElementById('Author');
const pageField = document.getElementById('Page-Count');
const isReadField = document.getElementById('Read');
const formError = document.querySelector('.form-error');

let mylibrary = [];

function book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

book1 = new book('Dune', 'Frank Herbert', 350, true);
book2 = new book('The Hobbit', 'JRR Tolkein', 300, false);
mylibrary.push(book1);
mylibrary.push(book2);


newbookBtn.addEventListener('click', () =>{
	formDiv.style.display = 'block';
	bookContainer.classList.add('blur');
});


closeBtn.addEventListener('click',() =>{
	formDiv.style.display = 'none';
	bookContainer.classList.remove('blur');
});


submitBtn.addEventListener('click', checkFormValidity);

function checkFormValidity(){
	if (!titleField.checkValidity() || !authorField.checkValidity() || !pageField.checkValidity()) {
				formError.style.display = 'block';
			    event.preventDefault();
				return;
			}
	formError.style.display = 'none';
	addBookToLibrary();
	displayLibrary();
	formDiv.style.display = 'none';
	bookContainer.classList.remove('blur');
	document.forms['bookform'].reset();
	event.preventDefault();
}


function addBookToLibrary(){
	let newtitle = titleField.value;
	let newauthor = authorField.value;
	let newpage = pageField.value;
	let newread = isReadField.checked;
	bookToAdd = new book(newtitle,newauthor,newpage,newread);
	mylibrary.push(bookToAdd);
}

function removeBookFromLibrary(index){
	mylibrary.splice(index, 1);
	displayLibrary();
}

function toggleReadBook(index){
	mylibrary[index].read = !mylibrary[index].read;
	displayLibrary();
}

function displayLibrary(){
	//clear items
	bookContainer.textContent = '';

	mylibrary.forEach((item, index) => {
		const newDiv = document.createElement('div');
		newDiv.classList.add('added-books');
		const titleDiv = document.createElement('h2');
		titleDiv.textContent = item.title;
		const authorDiv = document.createElement('h3');
		authorDiv.textContent = 'By: ' + item.author;
		const pageDelDiv = document.createElement('div');
		pageDelDiv.classList.add('page-del-div');
		const pageDiv = document.createElement('p');
		pageDiv.textContent = 'Page-Count: ' + item.pages;
		const delBtn = document.createElement('span');
		delBtn.classList.add('material-icons-outlined', 'del-btn');
		delBtn.textContent = 'delete';
		delBtn.addEventListener('click', () => removeBookFromLibrary(index));
		const readBtn = document.createElement('input');
		readBtn.type = 'checkbox';
		readBtn.checked = item.read;
		readBtn.addEventListener('click', () => toggleReadBook(index));

		newDiv.appendChild(titleDiv);
		newDiv.appendChild(authorDiv);
		pageDelDiv.appendChild(pageDiv);
		pageDelDiv.appendChild(readBtn);
		pageDelDiv.appendChild(delBtn);
		
		newDiv.appendChild(pageDelDiv);

		if (item.read) {
			newDiv.classList.add('read');
		} else {
			newDiv.classList.add('unread');
		}
		bookContainer.appendChild(newDiv);
	});
};

displayLibrary();
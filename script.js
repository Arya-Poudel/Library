let table = document.getElementById('mytable');
let closeBtn = document.getElementById('close-form');
let formDiv = document.querySelector(".form-wrapper");
let newbookBtn = document.getElementById('newbtn');
let form = document.getElementById("bookform");

let mylibrary = [];

function book(title, author, pages, read) {
			this.title = title;
			this.author = author;
			this.pages = pages;
			this.read = read;
	}

function addBookToLibrary(){
	let newtitle = document.getElementById('Title').value;
	let newauthor = document.getElementById('Author').value;
	let newpage = document.getElementById('Page-Count').value;
	let newread = document.getElementById('Read').checked;
	bookToAdd = new book(newtitle,newauthor,newpage,newread);
	mylibrary.push(bookToAdd);
}


book1 = new book('Dune', 'Frank Herbert', 350, true)
mylibrary.push(book1);

function displayLibrary(){
 	//clear the contents
	while (table.rows.length > 1) {
  		table.deleteRow(1);
	}
 	for (let i = 0; i < mylibrary.length; i++) {
		let row = document.createElement('tr');
		// row.setAttribute('book-id', i + 1);
		if (i == mylibrary.length - 1 ) {
			row.classList.add('last-row-style')
		} 
		else {
			row.classList.add('row-style');
		}
		
		table.appendChild(row);

		let titleData = document.createElement('td');
		titleData.textContent = mylibrary[i].title;
		row.appendChild(titleData);

		let authorData = document.createElement('td');
		authorData.textContent = mylibrary[i].author;
		row.appendChild(authorData);

		let pageData = document.createElement('td');
		pageData.textContent = mylibrary[i].pages;
		row.appendChild(pageData);

		let readData = document.createElement('td').appendChild(document.createElement('input'));
		readData.type = 'checkbox';
		readData.checked = mylibrary[i].read;
		row.appendChild(readData);

		let delData = document.createElement('td');
		delData.textContent = 'Del';
		delData.classList.add('del-btn');
		row.appendChild(delData);
		delData.addEventListener('click', removeBookFromLibrary)
	}
};

function removeBookFromLibrary(){
	mylibrary.splice(this.parentNode.rowIndex - 1, 1);
	displayLibrary();
}

newbookBtn.addEventListener('click', () =>{
	formDiv.style.display = 'block';
	table.classList.add('blur');
});

closeBtn.addEventListener('click',() =>{
	formDiv.style.display = 'none';
	table.classList.remove('blur');
});

form.onsubmit = function(){
	addBookToLibrary();
	document.forms['bookform'].reset();
	displayLibrary();
	formDiv.style.display = 'none';
	table.classList.remove('blur');
	return false;
};

displayLibrary();
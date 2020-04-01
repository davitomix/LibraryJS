let myLibrary = [];

// Cosntructor for books
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function one() {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
  this.export = function one() {
    return [title, author, pages, read];
  };
}

function render(library = myLibrary) {
  const table = document.getElementById('tableBody');
  while (table.rows.length >= 1) {
    table.deleteRow(0);
  }
  for (let i = 0; i < myLibrary.length; i += 1) {
    const row = table.insertRow(0);
    row.setAttribute('id', `row${i}`);
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const readCell = row.insertCell(3);
    const deleteButton = row.insertCell(4);
    pagesCell.setAttribute('class', 'toCenter');
    readCell.setAttribute('class', 'toCenter');
    titleCell.innerHTML = library[i].title;
    authorCell.innerHTML = library[i].author;
    pagesCell.innerHTML = library[i].pages;
    readCell.innerHTML = library[i].read;
    readCell.setAttribute('onClick', 'toggleRead(this)');
    deleteButton.innerHTML = 'Delete';
    deleteButton.classList.add('deleteButton');
    deleteButton.setAttribute('id', i);
    deleteButton.setAttribute('onClick', 'removeBookFromLibrary(this.id)');
  }
}

// Add book to array and call render to see the info in the html.
function addBookToLibrary(book) {
  myLibrary.push(book);
  render(myLibrary);
}
/* eslint-disable */
// Render the infomration from the form to the html.
function createBook() {
  const titleInput = document.getElementById('titleInput').value;
  const authorInput = document.getElementById('authorInput').value;
  const pagesInput = document.getElementById('pagesInput').value;
  const readInput = document.getElementById('readInput').value;
  const book = new Book(titleInput, authorInput, pagesInput, readInput);
  document.getElementById('titleInput').value = '';
  document.getElementById('authorInput').value = '';
  document.getElementById('pagesInput').value = '';
  document.getElementById('readInput').value = 'No';
  addBookToLibrary(book);
}


// remove book from myLibrary
function removeBookFromLibrary(index, library = myLibrary) {
  myLibrary.splice(index, 1);
  render(myLibrary);
}

// toggles between READ/NOT-READ/READING
function toggleRead(element) {
  const index = element.parentElement.id.substr(element.parentElement.id.length - 1);
  if (element.innerHTML === 'Yes') {
    myLibrary[index].read = 'No';
  } else if (element.innerHTML === 'No') {
    myLibrary[index].read = 'Reading';
  } else if (element.innerHTML === 'Reading') {
    myLibrary[index].read = 'Yes';
  }
  render(myLibrary);
}

function populateStorage(library = myLibrary) {
  for (let i = 0; i < library.length; i += 1) {
    localStorage.setItem(`tableIndex${i}Title`, library[i].title);
    localStorage.setItem(`tableIndex${i}Author`, library[i].author);
    localStorage.setItem(`tableIndex${i}Pages`, library[i].pages);
    localStorage.setItem(`tableIndex${i}Read`, library[i].read);
  }
}
/* eslint-enable */
// retrieve data from Localstorage
function retrieveDataFromStorage(library = myLibrary) {
  const storageLength = localStorage.length;
  for (let i = 0; i < storageLength / 4; i += 1) {
    const bookToAdd = new Book(localStorage[`tableIndex${i}Title`], localStorage[`tableIndex${i}Author`], localStorage[`tableIndex${i}Pages`], localStorage[`tableIndex${i}Read`]);
    library.push(bookToAdd);
  }
  render();
}
/* eslint-disable */
// restore data from localStorage
function restoreData() {
  myLibrary = [];
  retrieveDataFromStorage(myLibrary);
}
/* eslint-enable */
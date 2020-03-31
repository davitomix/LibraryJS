let myLibrary = [];

// Cosntructor for books
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
      return `${title} by ${author}, ${pages} pages, ${read}`
  }
  this.export = function() {
      return [title, author, pages, read]
  }
}

// Add book to array and call render to see the info in the html.
function addBookToLibrary(book) {
  myLibrary.push(book)
  render(myLibrary)
}

//Render the infomration from the form to the html.
function createBook (){
  let titleInput = document.getElementById('titleInput').value
  let authorInput = document.getElementById('authorInput').value
  let pagesInput = document.getElementById('pagesInput').value
  let readInput = document.getElementById('readInput').value
  let book = new Book(titleInput, authorInput, pagesInput, readInput)
  document.getElementById('titleInput').value = ''
  document.getElementById('authorInput').value = ''
  document.getElementById('pagesInput').value = ''
  document.getElementById('readInput').value = 'No'
  addBookToLibrary(book)
}

function render(library = myLibrary){ 
  let table = document.getElementById('tableBody')
  //1. clear table content
  while (table.rows.length >= 1) {
      table.deleteRow(0)
  }
  //2. Append each book
      //auxiliar switch: makes the first row (after the header) always darker
      let situation1 = ''
      let situation2 = ''
      if (myLibrary.length % 2 === 0) {
          situation1 = 'even'
          situation2 = 'odd'
      } else {
          situation1 = 'odd'
          situation2 = 'even'
      }

  for (let i = 0; i < myLibrary.length; i++) {

      //add new row with ID and class
      let row = table.insertRow(0)

      row.setAttribute('id', `row${i}`)
      if (table.rows.length % 2 === 0) {row.classList.add(situation1)} else {row.classList.add(situation2)}

      //create and fill row cells
      let titleCell = row.insertCell(0)
      let authorCell = row.insertCell(1)
      let pagesCell = row.insertCell(2)
      let readCell = row.insertCell(3)
      let deleteButton = row.insertCell(4)
      
      pagesCell.setAttribute('class', 'toCenter')
      readCell.setAttribute('class', 'toCenter')

      titleCell.innerHTML = library[i].title
      authorCell.innerHTML = library[i].author
      pagesCell.innerHTML = library[i].pages
      readCell.innerHTML = library[i].read
      readCell.setAttribute('onClick', 'toggleRead(this)')
      deleteButton.innerHTML = 'Delete'
      deleteButton.classList.add('deleteButton')
      deleteButton.setAttribute('id', i)
      deleteButton.setAttribute('onClick', 'removeBookFromLibrary(this.id)')
  }
}

//remove book from myLibrary
function removeBookFromLibrary(index, library = myLibrary) {
  myLibrary.splice(index, 1)
  render(myLibrary)
}

//toggles between READ/NOT-READ/READING
function toggleRead(element) {
  let index = element.parentElement.id.substr(element.parentElement.id.length - 1);
  if (element.innerHTML === 'Yes') {
      myLibrary[index].read = 'No'
  } else if (element.innerHTML === 'No') {
      myLibrary[index].read = 'Reading'
  } else if (element.innerHTML === 'Reading'){
      myLibrary[index].read = 'Yes'
  }
  render(myLibrary)
}
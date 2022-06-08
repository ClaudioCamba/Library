// All main variables
let myLibrary = [],
    bookShelf = document.querySelector('.lib-container'),
    bodyElem = document.querySelector('body'),
    formTitle = document.querySelector('#title'),
    formAuthor = document.querySelector('#author'),
    formPages = document.querySelector('#pages'),
    formRead = document.querySelector('#read');

// Hide / Show Modal
function hideShowModal() {
    if (bodyElem.classList.contains('showModal')) {
        bodyElem.classList.remove('showModal');
    } else {
        bodyElem.classList.add('showModal');
    }
}

// Return book array position in library
function checkLibrary(title) {
    for (var i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            return i;
        }
    }
}

// Encode characters
function encodeHTML(s) {
    return s.split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;').split("'").join('&#39;');
}
// Decode characters
function decodeHTML(s) {
    return s.split('&amp;').join('&').split('&lt;').join('<').split('&quot;').join('"').split('&#39;').join("'");
}

// Book Function
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.createCard = function () {
    const listElem = document.createElement("li");
    listElem.innerHTML = '<h4>' + this.title + '</h4>';
    listElem.innerHTML += '<p>' + this.author + '</p>';
    listElem.innerHTML += '<p>' + this.pages + '</p>';
    listElem.innerHTML += '<p>' + this.read + '</p>';
    listElem.innerHTML += '<input type="button" onClick="removeBook(this)" value="X">';
    listElem.setAttribute('data-title', encodeHTML(this.title));
    bookShelf.prepend(listElem);
}

function addBooktoLibrary() {
    let book = new Book(formTitle.value, formAuthor.value, formPages.value, formRead.value);
    myLibrary.unshift(book); // Add book to Array
    book.createCard(); // Add book to page
}

function removeBook(elem) {
    let parent = elem.parentElement,
        bookTitle = decodeHTML(parent.attributes['data-title'].value),
        position = checkLibrary(bookTitle);

    if (position > -1) {
        parent.remove();
        myLibrary.splice(position, 1);
    } else {
        console.log('BOOK NOT FOUND');
    }
}

// First test book
function firstBook() {
    let book = new Book('First Book', 'Unknown', 250, 'No');
    myLibrary.unshift(book);
    book.createCard();
}
firstBook();
// IMPROVEMENTS ============================================
// Clear form input values
// Check if book already exists
// Only add if sections have been filled
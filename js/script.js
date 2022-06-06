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
    bookShelf.prepend(listElem);
}

function addBooktoLibrary() {
    const book = new Book(formTitle.value, formAuthor.value, formPages.value, formRead.value);
    myLibrary.unshift(book);
    book.createCard();
    // for (const book of myLibrary) {
    //     const listElement = document.createElement("li");
    //     listElement.innerText = book;
    //     bookShelf.appendChild(listElement);
    // }

}

// IMPROVEMENTS ============================================
// Check if book already exists
// Only add if sections have been filled
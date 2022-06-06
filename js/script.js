let myLibrary = ['book1', 'book2', 'book3'],
    bookShelf = document.querySelector('.lib-container'),
    bodyElem = document.querySelector('body'),
    addBook = document.querySelector('.addBook');

// Hide / Show Modal
function hideShowModal() {
    if (bodyElem.classList.contains('showModal')) {
        bodyElem.classList.remove('showModal');
    } else {
        bodyElem.classList.add('showModal');
    }
}

function Book() {

}

function addBooktoLibrary(book) {
    // myLibrary.push(book);
    // console.log(myLibrary);
}

function addBooksToPage() {
    for (const book of myLibrary) {
        const listElement = document.createElement("li");
        listElement.innerText = book;
        bookShelf.appendChild(listElement);
    }
}

addBooksToPage();
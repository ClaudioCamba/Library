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
    listElem.setAttribute('data-title', encodeHTML(this.title));
    bookShelf.prepend(listElem);
}

function addBooktoLibrary() {

    let book = new Book(formTitle.value, formAuthor.value, formPages.value, formRead.value);

    myLibrary.push(book); // Add book to Array
    book.createCard(); // Add book to page
    // book.createCard();
    // for (const book of myLibrary) {
    //     const listElement = document.createElement("li");
    //     listElement.innerText = book;
    //     bookShelf.appendChild(listElement);
    // }
}

// function showBooksOnPage() {
//     for (const book of myLibrary) {
//         book.createCard();
//     }
// }

// function checkLibrary() {

// }

// let test = document.querySelectorAll('.lib-container li h4')



// IMPROVEMENTS ============================================
// Change pages to numbers and read into radio
// Clear form input values
// Check if book already exists
// Only add if sections have been filled
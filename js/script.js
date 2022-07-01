// Library module pattern function
const library = (() => {
    const _libraryArray = [],
        modalBtn = document.querySelectorAll('.newBook, .closeModal, .addBook'),
        bookShelf = document.querySelector('.lib-container'),
        bodyElem = document.querySelector('body'),
        formTitle = document.querySelector('#title'),
        formAuthor = document.querySelector('#author'),
        formPages = document.querySelector('#pages'),
        formRead = document.querySelector('#read'),
        addBookBtn = document.querySelector('.addBook');
    let newBook = null;

    // Meet conditions then add book
    const addBook = (title, author, pages, value) => {
        if (_libraryArray.every(function (book) { return book.title !== title; })) { // Check each title against new book title (prevent duplicates)
            _libraryArray.push(newBook = new Books(encodeHTML(title), author, pages, value));
            bookShelf.appendChild(newBook.bookElem());
        };
    }

    addBookBtn.addEventListener('click', () => addBook(formTitle.value, formAuthor.value, formPages.value, formRead.value)); // Submit book to be added
    modalBtn.forEach((btn) => btn.addEventListener('click', () => { modalToggle() })); // Modal open/close eventlistner to button elements
    const encodeHTML = (s) => s.split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;').split("'").join('&#39;');    // Encode characters
    const modalToggle = () => bodyElem.classList.contains('showModal') === true ? bodyElem.classList.remove('showModal') : bodyElem.classList.add('showModal');    // Modal toggler
    const readToggle = (status) => status === 'Read' ? 'Unread' : 'Read';    // Read toggle
    const removeBook = (e) => { _libraryArray.splice(_libraryArray.indexOf(e), 1); };    // Remove book from array
    const getLibrary = () => _libraryArray; // View books in library

    return { getLibrary, removeBook, addBook, readToggle };
})();


// Book Class Function
class Books {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.elem = null;
        this.object = this;
    }

    // Build book element
    bookElem(elem, read, closeBtn, readBtn, object) {
        elem = document.createElement("li");
        closeBtn = document.createElement('input');
        readBtn = document.createElement('input');
        read = document.createElement('p');
        elem.innerHTML = '<h4>Title: ' + this.title + '</h4>';
        elem.innerHTML += '<p>Author: ' + this.author + '</p>';
        elem.innerHTML += '<p>Pages: ' + this.pages + '</p>';
        read.innerText = this.read;
        closeBtn.classList.add('closeBtn');
        readBtn.classList.add('readBtn');
        closeBtn.type = 'button';
        readBtn.type = 'button';
        closeBtn.value = 'X';
        readBtn.value = library.readToggle(this.read);
        elem.appendChild(read);
        elem.appendChild(readBtn);
        elem.appendChild(closeBtn);
        this.elem = elem;
        object = this.object;

        readBtn.addEventListener('click', function (e) { // update object in array
            e.target.value = object.read;
            object.read = library.readToggle(object.read);
            read.innerText = object.read

        });

        closeBtn.addEventListener('click', function (e) {
            library.removeBook(object);
            e.target.parentElement.remove();
        });

        return this.elem;
    }
}

// Initial books
firstBooks = [
    {
        title: 'First Book',
        author: 'Unknown',
        pages: 250,
        read: 'Unread'
    }, {
        title: 'Second Book40',
        author: 'Unknown',
        pages: 220,
        read: 'Read'
    }, {
        title: 'Second Book42',
        author: 'Known',
        pages: 240,
        read: 'Unread'
    }
];

for (const book of firstBooks) {
    library.addBook(book.title, book.author, book.pages, book.read);
}

// IMPROVEMENTS ============================================
// Clear form input values
// Check if book already exists
// Only add book if sections have been filled
// Add style, color and design
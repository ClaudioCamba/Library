const library = (() => {
    const _libraryArray = [],
        bookShelf = document.querySelector('.lib-container'),
        bodyElem = document.querySelector('body'),
        formTitle = document.querySelector('#title'),
        formAuthor = document.querySelector('#author'),
        formPages = document.querySelector('#pages'),
        formRead = document.querySelector('#read'),
        addBookBtn = document.querySelector('.addBook');
    let newBook = null;

    addBookBtn.addEventListener('click', (e) => addBook(formTitle.value, formAuthor.value, formPages.value, formRead.value));

    const addBook = (title, author, pages, value) => {
        _libraryArray.push(newBook = new Books(title, author, pages, value));
        // _libraryArray.forEach((item, index) => item.id = index)
        bookShelf.appendChild(newBook.bookElem());
    }

    const getLibrary = () => _libraryArray;

    const removeBook = (e) => _libraryArray.splice(_libraryArray.indexOf(e), 1);

    // const setLibrary = (a) => _libraryArray.push(a);

    return { getLibrary, removeBook };
})();


// Book Function
class Books {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    remove() { library.removeBook(this); }

    bookElem(elem, closeBtn, readBtn) {
        elem = document.createElement("li");
        closeBtn = document.createElement('input');
        readBtn = document.createElement('input');
        elem.id = this.id;
        elem.innerHTML = '<h4>Title: ' + this.title + '</h4>';
        elem.innerHTML += '<p>Author: ' + this.author + '</p>';
        elem.innerHTML += '<p>Pages: ' + this.pages + '</p>';
        elem.innerHTML += '<p class="readBook">Status: ' + this.read + '</p>';
        closeBtn.classList.add('closeBtn');
        closeBtn.type = 'button';
        closeBtn.value = 'X';
        readBtn.type = 'button';
        readBtn.classList.add('readBtn');
        readBtn.value = this.read;


        readBtn.addEventListener('click', function (e) {
            console.log(e.target)
        });

        closeBtn.addEventListener('click', function (e) {
            e.target.parentElement.remove();
        });


        elem.appendChild(readBtn);
        elem.appendChild(closeBtn);
        return elem;
    }
}


// method to update read / unread
// method to remove book from page
// add book to library array
//



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
// function checkLibrary(title) {
//     for (var i = 0; i < myLibrary.length; i++) {
//         if (myLibrary[i].title === title) {
//             return i;
//         }
//     }
// }

// // Encode characters
// function encodeHTML(s) {
//     return s.split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;').split("'").join('&#39;');
// }

// // Decode characters
// function decodeHTML(s) {
//     return s.split('&amp;').join('&').split('&lt;').join('<').split('&quot;').join('"').split('&#39;').join("'");
// }

// // Read toggle
// function readToggle(status) {
//     let x = status === 'Read' ? 'Unread' : 'Read';
//     return x;
// }


// Book Function


// function Book(title, author, pages, read) {
//     this.title = title
//     this.author = author
//     this.pages = pages
//     this.read = read
// }

// // Storing element creation function within prototype
// Book.prototype.createCard = function () {
//     const listElem = document.createElement("li");
//     listElem.innerHTML = '<h4>Title: ' + this.title + '</h4>';
//     listElem.innerHTML += '<p>Author: ' + this.author + '</p>';
//     listElem.innerHTML += '<p>Pages: ' + this.pages + '</p>';
//     listElem.innerHTML += '<p class="readBook">Status: ' + this.read + '</p>';
//     listElem.innerHTML += '<input class="closeBtn" type="button" onClick="removeBook(this)" value="X">';

//     // Read Button w/ update function
//     let readButton = document.createElement('input');
//     readButton.setAttribute('type', 'button');
//     readButton.setAttribute('class', 'readBtn');
//     readButton.setAttribute('value', readToggle(this.read));
//     readButton.addEventListener('click', function () {
//         myLibrary[checkLibrary(decodeHTML(this.parentElement.attributes['data-title'].value))].readUpdate();
//     });

//     listElem.appendChild(readButton);
//     listElem.setAttribute('data-title', encodeHTML(this.title));
//     bookShelf.prepend(listElem);
// }

// // Toggle read / unread
// Book.prototype.readUpdate = function () {
//     this.read = readToggle(this.read);
//     document.querySelector('[data-title="' + encodeHTML(this.title) + '"] .readBook').innerText = 'Status: ' + this.read;
//     document.querySelector('[data-title="' + encodeHTML(this.title) + '"] .readBtn').value = readToggle(this.read);
// }

// // Add book to page and library array
// function addBooktoLibrary() {
//     let book = new Book(formTitle.value, formAuthor.value, formPages.value, formRead.value);
//     myLibrary.unshift(book); // Add book to Array
//     book.createCard(); // Add book to page
// }

// // Remove book from page and library array
// function removeBook(elem) {
//     let parent = elem.parentElement,
//         position = checkLibrary(decodeHTML(parent.attributes['data-title'].value));

//     if (position > -1) {
//         parent.remove();
//         myLibrary.splice(position, 1);
//     } else {
//         console.log('BOOK NOT FOUND');
//     }
// }

// First test book
// function firstBook() {
//     Firstbooks = [
//         {
//             title: 'First Book',
//             author: 'Unknown',
//             pages: 250,
//             read: 'Unread'
//         }, {
//             title: 'Second Book40',
//             author: 'Unknown',
//             pages: 220,
//             read: 'Read'
//         }, {
//             title: 'Second Book42',
//             author: 'Known',
//             pages: 240,
//             read: 'Unread'
//         }
//     ];

//     for (const chosen of Firstbooks) {
//         let book = new Book(chosen.title, chosen.author, chosen.pages, chosen.read);
//         myLibrary.unshift(book);
//         book.createCard();
//     }
// }
// firstBook();

// IMPROVEMENTS ============================================
// Clear form input values
// Check if book already exists
// Only add book if sections have been filled
// Add style, color and design
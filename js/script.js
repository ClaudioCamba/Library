// Library module pattern function
const library = (() => {
  const _libraryArray = [],
    modalBtn = document.querySelectorAll(".newBook, .closeModal"),
    bookShelf = document.querySelector(".lib-container"),
    bodyElem = document.querySelector("body"),
    addBookBtn = document.querySelector(".addBook"),
    form = document.querySelector("form"),
    formTitle = document.querySelector("#title"),
    titleError = document.querySelector("#title + span.error"),
    formAuthor = document.querySelector("#author"),
    authorError = document.querySelector("#author + span.error"),
    formPages = document.querySelector("#pages"),
    pagesError = document.querySelector("#pages + span.error"),
    formRead = document.querySelector("#read"),
    readError = document.querySelector("#read + span.error");
  let newBook = null;

  // Meet conditions then add book
  const addBook = (title, author, pages, value) => {
    if (
      _libraryArray.every(function (book) {
        return book.title !== title;
      })
    ) {
      // Check each title against new book title (prevent duplicates)
      _libraryArray.push((newBook = new Books(encodeHTML(title), author, pages, value)));
      bookShelf.appendChild(newBook.bookElem());
    }
  };

  const encodeHTML = (s) => s.split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;").split("'").join("&#39;"); // Encode characters
  const modalToggle = () =>
    bodyElem.classList.contains("showModal") === true ? bodyElem.classList.remove("showModal") : bodyElem.classList.add("showModal"); // Modal toggler
  const readToggle = (status) => (status === "Read" ? "Unread" : "Read"); // Read toggle
  const removeBook = (e) => {
    _libraryArray.splice(_libraryArray.indexOf(e), 1);
  }; // Remove book from array
  const getLibrary = () => _libraryArray; // View books in library

  // Validate modal form
  formTitle.addEventListener("input", function (event) {
    // Each time the user types something, we check if the
    // form fields are valid.
    if (formTitle.validity.valid) {
      // In case there is an error message visible, if the field
      // is valid, we remove the error message.
      titleError.textContent = ""; // Reset the content of the message
      titleError.className = "error"; // Reset the visual state of the message
    } else {
      // If there is still an error, show the correct error
      showTitleError();
    }
  });

  formAuthor.addEventListener("input", function (event) {
    if (formAuthor.validity.valid) {
      authorError.textContent = "";
      authorError.className = "error";
    } else {
      showAuthorError();
    }
  });

  formAuthor.addEventListener("input", function (event) {
    if (formAuthor.validity.valid) {
      authorError.textContent = "";
      authorError.className = "error";
    } else {
      showAuthorError();
    }
  });

  formPages.addEventListener("input", function (event) {
    if (formPages.validity.valid) {
      pagesError.textContent = "";
      pagesError.className = "error";
    } else {
      showPagesError();
    }
  });

  formRead.addEventListener("input", function (event) {
    if (formRead.validity.valid) {
      readError.textContent = "";
      readError.className = "error";
    } else {
      showReadError();
    }
  });

  //  Error messages
  function showTitleError() {
    if (formTitle.validity.patternMismatch) {
      titleError.textContent = `${formTitle.value} does not match the username format`;
    }

    if (formTitle.validity.valueMissing) {
      // If the field is empty,
      // display the following error message.
      titleError.textContent = "Can't submit empty title";
    } else if (formTitle.validity.tooLong) {
      // If the field doesn't contain an email address,
      // display the following error message.
      titleError.textContent = `Username should be no more then ${formTitle.maxLength} characters; you entered ${formTitle.value.length}.`;
    }

    // Set the styling appropriately
    titleError.className = "error active";
  }

  function showAuthorError() {
    if (formAuthor.validity.patternMismatch) {
      authorError.textContent = `${formAuthor.value} does not match the author format`;
    }

    if (formAuthor.validity.valueMissing) {
      authorError.textContent = "Can't submit empty author";
    } else if (formAuthor.validity.tooLong) {
      authorError.textContent = `Username should be no more then ${formAuthor.maxLength} characters; you entered ${formAuthor.value.length}.`;
    }

    authorError.className = "error active";
  }

  function showPagesError() {
    if (formPages.validity.badInput) {
      pagesError.textContent = `Entered value does not match the page number format`;
    }

    if (formPages.value === "") {
      pagesError.textContent = "Can't submit empty number of pages";
    } else if (formPages.validity.rangeOverflow) {
      pagesError.textContent = `Books should have no more then ${formPages.max} pages; you entered ${formPages.value}.`;
    } else if (formPages.validity.rangeUnderflow) {
      pagesError.textContent = `Books should have no less than ${formPages.min} pages; you entered ${formPages.value}.`;
    }

    pagesError.className = "error active";
  }

  function showReadError() {
    if (formRead.validity.patternMismatch) {
      readError.textContent = `${formRead.value} does not match the author format`;
    }

    if (formRead.validity.valueMissing) {
      readError.textContent = "An option must be selected";
    }
    readError.className = "error active";
  }

  // Submit
  addBookBtn.addEventListener("click", function (event) {
    let valCheck = true;
    // if the email field is valid, we let the form submit
    if (!formTitle.validity.valid) {
      // If it isn't, we display an appropriate error message
      showTitleError();
      valCheck = false;
    }

    if (!formAuthor.validity.valid) {
      // If it isn't, we display an appropriate error message
      showAuthorError();
      valCheck = false;
    }

    if (!formPages.validity.valid || formPages.value === "") {
      // If it isn't, we display an appropriate error message
      showPagesError();
      valCheck = false;
    }

    if (!formRead.validity.valid) {
      // If it isn't, we display an appropriate error message
      showReadError();
      valCheck = false;
    }

    if (valCheck) {
      addBook(formTitle.value, formAuthor.value, formPages.value, formRead.value);
      modalToggle();
    }
  });

  // Modal open/close eventlistner to button elements
  modalBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      modalToggle();
    })
  );

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
    closeBtn = document.createElement("input");
    readBtn = document.createElement("input");
    read = document.createElement("p");
    elem.innerHTML = "<h4>Title: " + this.title + "</h4>";
    elem.innerHTML += "<p>Author: " + this.author + "</p>";
    elem.innerHTML += "<p>Pages: " + this.pages + "</p>";
    read.innerText = this.read;
    closeBtn.classList.add("closeBtn");
    readBtn.classList.add("readBtn");
    closeBtn.type = "button";
    readBtn.type = "button";
    closeBtn.value = "X";
    readBtn.value = library.readToggle(this.read);
    elem.appendChild(read);
    elem.appendChild(readBtn);
    elem.appendChild(closeBtn);
    this.elem = elem;
    object = this.object;

    readBtn.addEventListener("click", function (e) {
      // update object in array
      e.target.value = object.read;
      object.read = library.readToggle(object.read);
      read.innerText = object.read;
    });

    closeBtn.addEventListener("click", function (e) {
      library.removeBook(object);
      e.target.parentElement.remove();
    });

    return this.elem;
  }
}

// Initial books
firstBooks = [
  {
    title: "First Book",
    author: "Unknown",
    pages: 250,
    read: "Unread",
  },
  {
    title: "Second Book40",
    author: "Unknown",
    pages: 220,
    read: "Read",
  },
  {
    title: "Second Book42",
    author: "Known",
    pages: 240,
    read: "Unread",
  },
];

for (const book of firstBooks) {
  library.addBook(book.title, book.author, book.pages, book.read);
}

// IMPROVEMENTS ============================================
// Clear form input values
// Check if book already exists
// Only add book if sections have been filled
// Add style, color and design

class Book {
    constructor(title, author, numOfPages, hasRead = false) {
        this.title = title;
        this.author = author;
        this.numOfPages = Number(numOfPages);
        this.hasRead = hasRead;
    }
}

const library = [new Book('Harry Potter And The Order Of Phoenix', 'JK Rowling', 670),];
const addBookButton = document.getElementById('add-book');
const formAddBookButton = document.getElementById('form-add-book');
const hideSidebarButton = document.getElementById('hide-sidebar');
const sidebar = document.getElementById('sidebar');
const bookForm = document.getElementById('book-form');
const booksElement = document.getElementById('books');

function getNewRemoveBookButton() {
    const removeBookButton = document.createElement('button');
    removeBookButton.type = 'button';
    removeBookButton.addEventListener('click', (event) => {
        library[event.target.parentNode.dataset.index] = null;
        event.target.parentNode.remove();
    });
    return removeBookButton;
}

function getNewReadStatusButton(book) {
    const readStatusButton = document.createElement('button');
    readStatusButton.classList.add(book.hasRead ? 'read' : 'not-read');
    readStatusButton.textContent = book.hasRead ? 'Read' : 'Not Read';
    readStatusButton.type = 'button';
    readStatusButton.addEventListener('click', () => {
        if (book.hasRead) {
            readStatusButton.classList.add('not-read');
            readStatusButton.classList.remove('read');
        } else {
            readStatusButton.classList.add('read');
            readStatusButton.classList.remove('not-read');
        }
        readStatusButton.textContent = !book.hasRead ? 'Read' : 'Not Read';
        book.hasRead = !book.hasRead;
    });
    return readStatusButton;
}

Book.prototype.getNewBookElement = function () {
    const removeBookButton = getNewRemoveBookButton();
    const book = document.createElement('section');
    book.classList.add('book');
    book.setAttribute('data-index', library.length - 1);
    const title = document.createElement('h2');
    title.textContent = this.title;
    const by = document.createElement('p');
    by.textContent = 'by';
    const author = document.createElement('p');
    author.textContent = this.author;
    author.style.fontWeight = 'bold';
    const pagesCount = document.createElement('p');
    pagesCount.textContent = this.numOfPages + ' pages long';
    const readStatusButton = getNewReadStatusButton(this);
    book.append(removeBookButton, title, by, author, pagesCount, readStatusButton);
    return book;
};

function getNewBook() {
    return new Book(
        document.getElementById('book-title').value,
        document.getElementById('book-author').value,
        document.getElementById('num-of-book-pages').value,
        document.getElementById('have-read').checked,
    );
}

function populateBooksElement() {
    for (const book of library) {
        booksElement.appendChild(book.getNewBookElement());
    }
}

addBookButton.addEventListener('click', () => {
    sidebar.style.display = 'block';
});

hideSidebarButton.addEventListener('click', () => {
    sidebar.style.display = 'none';
});

formAddBookButton.addEventListener('click', (event) => {
    if (!bookForm.checkValidity()) return;
    event.preventDefault();
    const newBook = getNewBook();
    bookForm.reset();
    library.push(newBook);
    booksElement.appendChild(newBook.getNewBookElement());
});

populateBooksElement();
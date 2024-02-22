class Book {
    #title;
    #author;
    #numOfPages;
    #hasRead;
    constructor(title, author, numOfPages, hasRead = false) {
        this.#title = title;
        this.#author = author;
        this.#numOfPages = Number(numOfPages);
        this.#hasRead = hasRead;
    }
    set title(value) {
        this.#title = value;
    }
    get title() { return this.#title; }
    set author(value) {
        this.#author = value;
    }
    get author() { return this.#author; }
    set numOfPages(value) {
        this.#numOfPages = value;
    }
    get numOfPages() { return this.#numOfPages; }
    set hasRead(value) {
        this.#hasRead = value;
    }
    get hasRead() { return this.#hasRead; }
}

const library = [new Book('Harry Potter And The Order Of Phoenix', 'JK Rowling', 670),];
const addBookButton = document.getElementById('add-book');
const formAddBookButton = document.getElementById('form-add-book');
const hideSidebarButton = document.getElementById('hide-sidebar');
const sidebar = document.getElementById('sidebar');
const bookForm = document.getElementById('book-form');
const booksElement = document.getElementById('books');

const BookView = (() => {
    const getNewRemoveBookButton = () => {
        const removeBookButton = document.createElement('button');
        removeBookButton.type = 'button';
        removeBookButton.addEventListener('click', (event) => {
            library[event.target.parentNode.dataset.index] = null;
            event.target.parentNode.remove();
        });
        return removeBookButton;
    }
    const getNewReadStatusButton = (book) => {
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
    const getNewBookElement = (book) => {
        const removeBookButton = BookView.getNewRemoveBookButton();
        const bookElement = document.createElement('section');
        bookElement.classList.add('book');
        bookElement.setAttribute('data-index', library.length - 1);
        const title = document.createElement('h2');
        title.textContent = book.title;
        const by = document.createElement('p');
        by.textContent = 'by';
        const author = document.createElement('p');
        author.textContent = book.author;
        author.style.fontWeight = 'bold';
        const pagesCount = document.createElement('p');
        pagesCount.textContent = book.numOfPages + ' pages long';
        const readStatusButton = BookView.getNewReadStatusButton(book);
        bookElement.append(removeBookButton, title, by, author, pagesCount, readStatusButton);
        return bookElement;
    };

    return { getNewRemoveBookButton, getNewReadStatusButton, getNewBookElement };
})();

const Helper = (() => {
    const getNewBookWithFormFieldValues = () => {
        return new Book(
            document.getElementById('book-title').value,
            document.getElementById('book-author').value,
            document.getElementById('num-of-book-pages').value,
            document.getElementById('have-read').checked,
        );
    };

    const populateBooksElement = () => {
        for (const book of library) {
            booksElement.appendChild(BookView.getNewBookElement(book));
        }
    };

    return { getNewBookWithFormFieldValues, populateBooksElement };
})();

addBookButton.addEventListener('click', () => {
    sidebar.style.display = 'block';
});

hideSidebarButton.addEventListener('click', () => {
    sidebar.style.display = 'none';
});

formAddBookButton.addEventListener('click', (event) => {
    if (!bookForm.checkValidity()) return;
    event.preventDefault();
    const newBook = Helper.getNewBookWithFormFieldValues();
    bookForm.reset();
    library.push(newBook);
    booksElement.appendChild(BookView.getNewBookElement(newBook));
});

Helper.populateBooksElement();
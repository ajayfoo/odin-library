const library = [new Book('Harry Potter And The Order Of Phoenix', 'JK Rowling', 670),];
const addBookButton = document.getElementById('add-book');
const hideFormButton = document.getElementById('hide-form');
const bookForm = document.getElementById('book-form');

function Book(title, author, numOfPages, hasRead = false) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.hasRead = hasRead;
}

addBookButton.addEventListener('click', () => {
    bookForm.style.display = 'block';
});

hideFormButton.addEventListener('click', () => {
    bookForm.style.display = 'none';
})
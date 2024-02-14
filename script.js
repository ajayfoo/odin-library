const library = [new Book('Harry Potter And The Order Of Phoenix', 'JK Rowling', 670),];

function Book(title, author, numOfPages, hasRead = false) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.hasRead = hasRead;
}
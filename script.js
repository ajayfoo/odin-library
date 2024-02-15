const library = [new Book('Harry Potter And The Order Of Phoenix', 'JK Rowling', 670),];
const addBookButton = document.getElementById('add-book');
const hideSidebarButton = document.getElementById('hide-sidebar');
const sidebar = document.getElementById('sidebar');

function Book(title, author, numOfPages, hasRead = false) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.hasRead = hasRead;
}

addBookButton.addEventListener('click', () => {
    sidebar.style.display = 'block';
});

hideSidebarButton.addEventListener('click', () => {
    sidebar.style.display = 'none';
})
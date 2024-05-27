const libraryArr = [];

function Book(title, author, numOfPages, hasRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.hasRead = hasRead;

    this.info = function () {
        return (
            `${this.title} by ${this.author}, ${this.numOfPages} pages, ` +
            (hasRead ? "already read" : "not read yet")
        );
    };
}

function addBook() {
    let title = prompt("What's the title of the Book?");
    let author = prompt("Who is the book's author?");
    let numOfPages = parseInt(prompt("How long is the book? (in pages)"));
    let hasRead = prompt("Have you read it yet? (true/false)") === "true";

    libraryArr.push(new Book(title, author, numOfPages, hasRead));
}

function displayBooks() {
    let contentPane = document.getElementById("main-content");
    contentPane.innerHTML = "";

    libraryArr.forEach((book) => {
        let bookElement = document.createElement("div");
        bookElement.setAttribute("class", "card");

        let bookTitle = document.createElement("div");
        bookTitle.setAttribute("class", "card-title");
        bookTitle.textContent = book.title;
        bookElement.appendChild(bookTitle);

        let bookAuthor = document.createElement("div");
        bookAuthor.setAttribute("class", "card-author");
        bookAuthor.textContent = `Author: ${book.author}`;
        bookElement.appendChild(bookAuthor);

        let bookPages = document.createElement("div");
        bookPages.setAttribute("class", "card-pages");
        bookPages.textContent = `Number Of Pages: ${book.numOfPages}`;
        bookElement.appendChild(bookPages);

        let bookStatus = document.createElement("div");
        bookStatus.setAttribute("class", "card-pages");
        bookStatus.innerHTML = `Reading Status: ${
            book.hasRead ? "Completed" : "Not Read"
        }`;
        bookElement.appendChild(bookStatus);

        contentPane.appendChild(bookElement);
    });
}

libraryArr.push(new Book("The Maze Runner", "James Dashner", 890, true));
libraryArr.push(new Book("The Maze Runner", "James Dashner", 891, false));
libraryArr.push(new Book("The Maze Runner", "James Dashner", 892, false));
libraryArr.push(new Book("The Maze Runner", "James Dashner", 893, false));
libraryArr.push(new Book("The Maze Runner", "James Dashner", 894, false));
libraryArr.push(new Book("The Maze Runner", "James Dashner", 895, true));
libraryArr.push(new Book("The Maze Runner", "James Dashner", 896, false));

displayBooks();

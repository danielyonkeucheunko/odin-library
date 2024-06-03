class Book {
    constructor(title, author, numOfPages, hasRead) {
        this.title = title;
        this.author = author;
        this.numOfPages = parseInt(numOfPages);
        this.hasRead = hasRead;
    }

    toggleStatus() {
        this.hasRead = !this.hasRead;
    }
}

class Library {
    constructor() {
        this.libraryArr = [];
    }

    addBook(title, author, numOfPages, hasRead) {
        this.libraryArr.push(new Book(title, author, numOfPages, hasRead));
        this.displayBooks();
    }

    displayBooks() {
        let contentPane = document.getElementById("main-content");
        let index = 0;
        contentPane.innerHTML = "";

        this.libraryArr.forEach((book) => {
            let bookElement = document.createElement("div");
            bookElement.setAttribute("class", "card");
            bookElement.setAttribute("index", `${index}`);

            let exitButton = document.createElement("button");
            exitButton.setAttribute("class", "icon-button");
            index++;

            exitButton.addEventListener("click", (event) => {
                this.libraryArr.splice(
                    event.target.parentElement.parentElement.getAttribute(
                        "index"
                    ),
                    1
                );
                this.displayBooks();
            });

            let icon = document.createElement("img");
            icon.setAttribute("class", "icon");
            icon.setAttribute("src", "icons/close.svg");
            exitButton.appendChild(icon);

            bookElement.appendChild(exitButton);

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
            bookStatus.setAttribute("class", "card-read");
            bookStatus.innerHTML = `Reading Status: ${
                book.hasRead ? "Completed" : "Not Read"
            }`;
            bookElement.appendChild(bookStatus);

            let toggleButton = document.createElement("button");
            toggleButton.setAttribute("class", "toggle");
            toggleButton.textContent = "Toggle Status";

            toggleButton.addEventListener("click", (event) => {
                this.libraryArr[
                    event.target.parentElement.getAttribute("index")
                ].toggleStatus();
                this.displayBooks();
            });

            bookElement.appendChild(toggleButton);

            contentPane.appendChild(bookElement);
        });
    }
}

const library = new Library();

const dialogButton = document.querySelector(".create-book");
const closeButton = document.querySelector(".close-button");
const form = document.getElementById("form");
const submitButton = document.getElementById("submit");

dialogButton.addEventListener("click", () => {
    document.querySelector("dialog").showModal();
});

closeButton.addEventListener("click", () => {
    document.querySelector("dialog").close();
});

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    library.addBook(
        form.elements["title"].value,
        form.elements["author"].value,
        form.elements["pages"].value,
        form.elements["read"].value
    );

    form.elements["title"].value = "";
    form.elements["author"].value = "";
    form.elements["pages"].value = "";
    document.querySelector("dialog").close();
});

library.addBook("The Maze Runner", "James Dashner", "372", true);
library.addBook("Lord of the Flies", "William Golding", "224", true);
library.addBook("The Great Gatsby", "F. Scott Fitzgerald", "208", true);
console.log(library.libraryArr);

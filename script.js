const libraryArr = [];

function Book(title, author, numOfPages, hasRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.hasRead = hasRead;
}

Book.prototype.toggleStatus = function () {
    this.hasRead = !this.hasRead;
};

function addBook(title, author, numOfPages, hasRead) {
    libraryArr.push(new Book(title, author, parseInt(numOfPages), hasRead));
    displayBooks();
}

function displayBooks() {
    let contentPane = document.getElementById("main-content");
    contentPane.innerHTML = "";
    let index = 0;

    libraryArr.forEach((book) => {
        let bookElement = document.createElement("div");
        bookElement.setAttribute("class", "card");
        bookElement.setAttribute("index", `${index}`);

        let exitButton = document.createElement("button");
        exitButton.setAttribute("class", "icon-button");
        index++;

        exitButton.addEventListener("click", (event) => {
            libraryArr.splice(
                event.target.parentElement.parentElement.getAttribute("index"),
                1
            );
            displayBooks();
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
            libraryArr[
                event.target.parentElement.getAttribute("index")
            ].toggleStatus();
            displayBooks();
        });

        bookElement.appendChild(toggleButton);

        contentPane.appendChild(bookElement);
    });
}

const dialogButton = document.querySelector(".create-book");
const closeButton = document.querySelector(".close-button");

dialogButton.addEventListener("click", () => {
    document.querySelector("dialog").showModal();
});

closeButton.addEventListener("click", () => {
    document.querySelector("dialog").close();
});

const form = document.getElementById("form");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    addBook(
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

addBook("The Maze Runner", "James Dashner", "372", true);
addBook("Lord of the Flies", "William Golding", "224", true);
addBook("The Great Gatsby", "F. Scott Fitzgerald", "208", true);

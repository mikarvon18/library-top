const container = document.querySelector("#container");
let myLibrary = [];
function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead

    this.info = function() {
        if (this.isRead){
            return `${this.title} by ${this.author}, ${this.pages} pages, is read`
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not yet read`
        }
        
    }
}
Book.prototype.toggleRead = function(){
    this.isRead = !this.isRead;
    refreshBooks();
}
function addbookToLibrary(book){
    myLibrary.push(book)
}



const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, true);
const theLoTR = new Book("The Lord of The Rings", "J.R.R Tolkien", 1042, true);
const theSilmarillion = new Book("The Silmarillion", "J.R.R Tolkien", 772, false);

addbookToLibrary(theHobbit);
addbookToLibrary(theLoTR);
addbookToLibrary(theSilmarillion);
refreshBooks();

function refreshBooks(){
    container.innerHTML = "";
    let div
    let title
    let author
    let pages
    let isRead
    for (let i = 0; i < myLibrary.length; i++) {
        //console.log(myLibrary[i].info());
        div = document.createElement('div');
        title = document.createElement('a');
        author = document.createElement('a');
        pages = document.createElement('a');
        isRead = document.createElement('a');
        removeBtn = document.createElement('button');
        removeBtn.addEventListener("click", function(){
            removeBook(i);
        });
        toggleRead = document.createElement('button');
        toggleRead.addEventListener("click", function(){
            myLibrary[i].toggleRead();
        })
        
        title.classList.add('book-title');
        author.classList.add('book-author');
        pages.classList.add('book-pages');
        isRead.classList.add('book-is-read');
        removeBtn.classList.add('remove-btn', `${i}`);
        toggleRead.classList.add('toggle-btn', `${i}`);


        title.appendChild(document.createTextNode(myLibrary[i].title));
        author.appendChild(document.createTextNode(`By: ${myLibrary[i].author}`));
        pages.appendChild(document.createTextNode(`Pages: ${myLibrary[i].pages}`));
        let bookRead = "yes";
        if (myLibrary[i].isRead == false){
            bookRead = "no";
        }
        isRead.appendChild(document.createTextNode(`Read: ${bookRead}`));
        removeBtn.appendChild(document.createTextNode("X"));
        toggleRead.appendChild(document.createTextNode("Toggle Read"));


        div.appendChild(title);
        div.appendChild(removeBtn);
        div.appendChild(author);
        div.appendChild(pages);
        div.appendChild(isRead);
        div.appendChild(toggleRead);
        

        div.classList.add('book-card');
        container.appendChild(div)
    }
}
function removeBook(num) {
    myLibrary.splice(num, 1);
    refreshBooks();
}

function addBook(event, bookInfo){
    const modal = document.getElementById('bookModal');

    event.preventDefault();
    modal.style.display = 'none';
    let isRead = false;
    if (bookInfo.isRead.checked) {
        isRead = true;
    }
    let book = new Book(bookInfo.title.value, bookInfo.author.value, bookInfo.pages.value, isRead);
    addbookToLibrary(book);
    document.getElementById('form').reset();
    refreshBooks();

}
let modalBtns = [...document.querySelectorAll(".button")];
modalBtns.forEach(function (btn) {
    btn.onclick = function () {
        let modal = btn.getAttribute("data-modal");
        document.getElementById(modal).style.display = "block";
    };
});
let closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function (btn) {
    btn.onclick = function () {
    let modal = btn.closest(".modal");
    modal.style.display = "none";
    };
});
window.onclick = function (event) {
    if (event.target.className === "modal") {
    event.target.style.display = "none";
    }
};


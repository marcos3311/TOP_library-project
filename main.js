const addBtn = document.getElementById('addBook');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const bookForm = document.querySelector('[name="book-info"]');
const library = document.querySelector('main');
const books = [];

// constructor
function Book (name, author, pages, read) {
    this.title = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.displayed = false;
}

// displaying the book on the DOM
Book.prototype = {
    addBook: function() {
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let btnDel = document.createElement('button');
        let readSlide = document.createElement('span');
        let circle = document.createElement('span');

        library.appendChild(div);
        div.appendChild(h2);
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(readSlide);
        readSlide.appendChild(circle);
        div.appendChild(btnDel);

        h2.textContent = this.title;
        p1.textContent = this.author;
        p2.textContent = this.pages;
        btnDel.textContent = 'X'

        div.classList.add('book');
        btnDel.classList.add('delete-btn');
        readSlide.classList.add('read-btn');
        circle.classList.add('circle');

        btnDel.addEventListener('click', () => {
            div.remove();
            books.splice(this);
        })

        // slide animation variables
        let pos;
        let limit;

        // slide default position based on read checkbox
        if (this.read == false) {
            circle.style.left = '0px';
            circle.style.backgroundColor = 'var(--dark-purple2)';
            pos = 0;
            limit = 'off';
        } else {
            circle.style.left = '40px';
            circle.style.backgroundColor = 'var(--red)';
            pos = 40;
            limit = 'on';
        }
    
        // slide animation on click
        readSlide.addEventListener('click', () => {
            let intervalId = setInterval(frame, 0.1);
    
            function frame() {
                if (limit == 'off') {
                    if (pos == 40) {
                        clearInterval(intervalId);
                        limit = 'on';
                        this.read = true;
                        circle.style.backgroundColor = 'var(--red)';
                    } else {
                        pos++;
                        circle.style.left = pos + 'px';
                    }
                } else {
                    if (pos == 0) {
                        clearInterval(intervalId);
                        limit = 'off';
                        this.read = false;
                        circle.style.backgroundColor = 'var(--dark-purple2)';
                    } else {
                        pos--;
                        circle.style.left = pos + 'px';
                    }
                }
            }
        })
    }
}

// open 'new book' modal
addBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
})

// close 'new book' modal
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
})

// add new book using form data
bookForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let title = e.currentTarget.title.value;
    let author = e.currentTarget.author.value;
    let pages = e.currentTarget.pages.value;
    let read = e.currentTarget.read.checked;

    books.push(new Book(title, author, pages, read))
    modal.style.display = 'none';

    for (let element of books) {
        if (element.displayed == false) {
            element.addBook();
            element.displayed = true;
        }
    }
})
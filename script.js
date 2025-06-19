t
//pop up form buttons
function openForm() {
  document.getElementById("book-div").style.display = "block";
  const blurDiv = document.getElementById("blur");
  blurDiv.style.display = "block"; 
  blurDiv.style.backgroundColor = "black";
  blurDiv.style.opacity = "0.7"; 
  blurDiv.style.zIndex = "8"; 
}

function closeForm() {
  document.getElementById("book-div").style.display = "none";
  const blurDivClose = document.getElementById("blur");
  blurDivClose.style.display = "none"; 
  blurDivClose.style.backgroundColor = "transparent";
  blurDivClose.style.opacity = "0.0"; 
  blurDivClose.style.zIndex = "-1"; 
}

//books
const myLibrary = [];

function saveLibraryToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadLibraryFromLocalStorage() {
  const data = localStorage.getItem("myLibrary");
  if (data) {
    const books = JSON.parse(data);
    myLibrary.length = 0; // Clear current array without losing reference
    books.forEach(bookData => {
      const book = new Book(
        bookData.author,
        bookData.title,
        bookData.cover,
        bookData.description
      );
      book.id = bookData.id; // Preserve original ID
      book.readstatus = bookData.readstatus; // Preserve read status
      myLibrary.push(book);
    });
  }
}


function Book(author, title, cover,description) {
  this.id = crypto.randomUUID();
  this.title = typeof title === 'string' ? title.toUpperCase() : '';
  this.author = typeof author === 'string' ? author.toUpperCase() : '';
  this.cover = cover;
  this.readstatus = false;
  this.description = typeof description === 'string' ? description.trim() : '';
}

function addBookToLibrary(event){
  event.preventDefault(); 

  let author = document.getElementById("Author").value.trim();
  let title = document.getElementById("Book-title").value.trim();
  let cover = document.getElementById("Book-cover").value.trim();
  let description = document.getElementById("Book-description").value.trim();

  if (!author || !title || !description) {
    alert("Please fill in all required fields (author, title, description).");
    return;
  }

  const book = new Book(author, title, cover, description);
  myLibrary.push(book);
 console.log(book);
  saveLibraryToLocalStorage();
  document.getElementById("Author").value = "";
  document.getElementById("Book-title").value = "";
  document.getElementById("Book-cover").value = "";
  document.getElementById("Book-description").value = "";

  displayBooks();
  closeForm();
}

function displayBooks() {
  const slide = document.querySelector(".container"); 
  slide.innerHTML = ""; // Clear existing books before re-rendering

  if (myLibrary.length === 0) {
    slide.innerHTML = "<p>No books in your library yet. Add some!</p>";
    return;
  }

  myLibrary.forEach((book, index) => {
    let item = document.createElement("div");
    item.classList.add("item");
    item.classList.toggle("read", book.readstatus);
    item.style.backgroundImage = `url("${book.cover || 'default-cover.jpg'}")`; // Optional fallback image

    let name = document.createElement("div");
    name.classList.add("name");
    name.textContent = book.title;

    let des = document.createElement("div");
    des.classList.add("des");
    des.textContent = book.description;

    let button = document.createElement("button");
    button.textContent = book.readstatus ? "Mark as unread" : "Mark as read";
    button.onclick = function () {
      book.readstatus = !book.readstatus;
      saveLibraryToLocalStorage(); 
      displayBooks(); // Update UI immediately
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      myLibrary.splice(index, 1);
      saveLibraryToLocalStorage();
      displayBooks();
    };

    item.appendChild(name);
    item.appendChild(des);
    item.appendChild(button);
    item.appendChild(deleteBtn);
    slide.appendChild(item);
  });
}

window.onload = function () {
  loadLibraryFromLocalStorage();
  displayBooks();
};
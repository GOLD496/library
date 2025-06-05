let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})

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

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
}
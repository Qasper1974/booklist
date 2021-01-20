// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to List
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  // create tr element
  const row = document.createElement("tr");

  row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="delete">del</a></td>
`;

  list.appendChild(row);
};
// Show Alert
UI.prototype.showAlert = function(message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  container.insertBefore(div, form);

  // Timeout after 2 seconds

  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 2000);

}

UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listener for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author ==='' || isbn ==='') {

    // Error alert
    ui.showAlert('Please fill out all fields', 'error');

  } else {
    // Add book to list
  ui.addBookToList(book);

  // Show success
  ui.showAlert('Book added', 'success');


  // Clear Fields
  ui.clearFields();

  }

  e.preventDefault();
});

// Event Listener for delete
document.querySelector('#book-list').addEventListener('click', function(e){
  
  const ui = new UI();

  ui.deleteBook(e.target);

  // Show message
  ui.showAlert('Book removed!', 'success');
  e.preventDefault();
})
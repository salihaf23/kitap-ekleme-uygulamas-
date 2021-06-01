class Book {
    constructor(kitap, yazar, isbn) {
      this.kitap = kitap;
      this.yazar = yazar;
      this.isbn = isbn;
    }
  }
  
  
  class UI {
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${book.kitap}</td>
        <td>${book.yazar}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteBook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
  
     
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#kitap').value = '';
      document.querySelector('#yazar').value = '';
      document.querySelector('#isbn').value = '';
    }
  }
  
  
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // olay: kitapları göster
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // kitap ekle
  document.querySelector('#book-form').addEventListener('submit', (e) => {
   
    e.preventDefault();
  
    // form degerlerini al
    const kitap = document.querySelector('#kitap').value;
    const yazar = document.querySelector('#yazar').value;
    const isbn = document.querySelector('#isbn').value;
  
    // dogrulama
    if(kitap === '' || yazar === '' || isbn === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      
      const book = new Book(kitap, yazar, isbn);
  
      
      UI.addBookToList(book);
  
     
      Store.addBook(book);
  
      
      UI.showAlert('Kitap eklendi', 'success');
  
     
      UI.clearFields();
    }
  });
  
  
  document.querySelector('#book-list').addEventListener('click', (e) => {
    
    UI.deleteBook(e.target);
  
    
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    
    UI.showAlert('Kitap Silindi', 'success');
  });
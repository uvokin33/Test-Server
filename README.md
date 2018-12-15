# Test-Server

## Features ##

* View books list
* View detailed book information (title, description, image, author, published, year, pages, total score)
* Search books by author, publisher, year
* Search books by keyword from description
* Users registration and authorization 
* Authorizated users can leave feedback for the book(text, rating)
* Get all feedbacks for the book 
* Get paged list of books
* Get paged list of the feedbaks for the book

## Instalation ##

```
git clone https://github.com/uvokin33/Test-Server.git 
npm install
npm start
```

## Usage ##

```
post request to '/books/' - add book (title, description, image, author, publisher, year, pages)  
put request to '/books/:id' - update book (title, description, image, author, publisher, year, pages)  
delete request to '/books/:id' - delete book  
```

```
get request to '/books/search?author=&publisher=&year=' - search book by author, publisher or year  
get request to '/books/search?description=' - search book by keyword in description  
```

```
get request to '/books/all' - show books list with all info  
get request to '/books/list' - show books titles and id  
get request to '/books/list/page/:id' - get page with books (3 books on page)
get request to '/books/:id' - show detailed info for selected book  
get request to '/books/:id?page=' - get page with feedbacks (3 feedback on page)

post request to '/:id' - if user is authorized send feedback for the book
```

```
get request to '/users/' - get all users  
get request to '/users/:id' - get selected user  
```
```
put request to '/users/:id' - update selected user 
delete request to '/users/:id' - delete selected user 
```
```
post request to '/users/register' - register new user 
post request to '/users/login' - login
```

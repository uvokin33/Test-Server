# Test-Server

## Instalation ##

```
git clone https://github.com/uvokin33/Test-Server.git 
npm install test-server
npm start
```

## Usage ##

```
post request to '/books/' - add book (params title, description, image, author, publisher, year, pages)  
put request to '/books/:id' - update book (params title, description, image, author, publisher, year, pages)  
delete request to '/books/:id' - delete book  
```

```
get request to '/books/search?author=&publisher=&year=' - search book by author, publisher or year  
get request to '/books/search?description=' - search book by keyword in description  
```

```
get request to '/books/all' - show list of books with all info  
get request to '/books/list' - show books titles and id  
get request to '/books/list/page/:id' - get page with books (3 books on page)
get request to '/books/:id' - show detailed info for selected book  
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

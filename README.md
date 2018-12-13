# Test-Server

## Instalation ##

```
git clone https://github.com/uvokin33/Test-Server.git 
npm install test-server
```

## Usage ##

```
post requiest to '/books/' - add book (params title, description, image, author, publisher, year, pages)  
put requiest to '/books/:id' - update book (params title, description, image, author, publisher, year, pages)  
delete requiest to '/books/:id' - delete book  
```

```
get requiest to '/books/search?author=&publisher=&year=' - search book by author, publisher or year  
get requiest to '/books/search?description=' - search book by keyword in description  
```

```
get requiest to '/books/all' - show list of books with all info  
get requiest to '/books/list' - show books titles and id  
get requiest to '/books/:id' - show detailed info for selected book  
```

```
get requiest to '/users/' - get all users  
get requiest to '/users/:id' - get selected user  
```
```
put requiest to '/users/:id' - update selected user 
delete requiest to '/users/:id' - delete selected user 
```
```
post requiest to '/users/register' - register new user 
post requiest to '/users/login' - login
```

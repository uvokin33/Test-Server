# Test-Server

## Instalation ##

```
git clone https://github.com/uvokin33/Test-Server.git 
npm install test-server
```

## Usage ##

post requiest to '/' - add book (params title, description, image, author, publisher, year, pages)  
put requiest to '/:id' - update book (params title, description, image, author, publisher, year, pages)  
delete requiest to '/:id' - delete book  

get requiest to '/search?author=&publisher=&year=' - search book by author, publisher or year  
get requiest to '/search?description=' - search book by keyword in description  

get requiest to '/all' - show list of books with all info  
get requiest to '/list' - show books titles and id  
get requiest to '/books/:id' - show detailed info for selected book  

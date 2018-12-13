const express = require('express');
const body_parser = require('body-parser');
const database = require('./database');

const book = require('./controllers/book');

const app = express();
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

const port = process.env.port || 5565;
const database_url = 'mongodb+srv://admin:1234@cluster0-yzzlq.mongodb.net/books_base?retryWrites=true';
const database_name = 'base';

app.post('/', book.add);
app.put('/:id', book.update);
app.delete('/:id', book.delete);

app.get('/search', book.search);

app.get('/', function(req, res){
    var info = {
        add: 'post to /',
        update: 'put to /:id',
        delete: 'delete to /:id',
        search: '/search - ?(description or author, publisher, year)',
        all: '/all',
        booksByTitles: '/list',
        getByID: '/books/:id'
    };
    res.send(info);
});

app.get('/all', book.get);
app.get('/list', book.getTitles);
app.get('/books/:id', book.getByID);

database.connect(database_url, database_name, function(error) {
    if(error)
        return console.log(error);
    
    app.listen(port, function() {
       console.log('Server is running on port ' + port); 
    });
});
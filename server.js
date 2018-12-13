const express = require('express');
const body_parser = require('body-parser');
const database = require('./database');

const port = process.env.port || 5565;
const database_url = 'mongodb+srv://admin:1234@cluster0-yzzlq.mongodb.net/books_base?retryWrites=true';
const database_name = 'base';

const app = express();
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

app.use('/books', require('./controllers/book'));
app.use('/users', require('./controllers/user'));

database.connect(database_url, database_name, function(error) {
    if(error)
        return console.log(error);
    
    app.listen(port, function() {
       console.log('Server is running on port ' + port); 
    });
});
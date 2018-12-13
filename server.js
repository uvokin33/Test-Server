const express = require('express');
const body_parser = require('body-parser');
const database = require('./database');

const book = require('./controllers/book');

const app = express();
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

const port = process.env.port || 5565;
const database_url = 'mongodb+srv://admin:1234@cluster0-yzzlq.mongodb.net/books_base?retryWrites=true';
const database_collection = 'base';

app.get('/', function(req, res){
    res.send('Working');
});

database.connect(database_url, database_collection, function(error) {
    if(error)
        return console.log(error);
    
    app.listen(port, function() {
       console.log('Server is running'); 
    });
});
const express = require('express');
const session = require('express-session');
const body_parser = require('body-parser');
const database = require('./database');

const port = process.env.port || 5565;
const database_url = 'mongodb+srv://admin:1234@cluster0-yzzlq.mongodb.net/books_base?retryWrites=true';
const database_name = 'base';

const app = express();
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

app.get('/', function(req, res){
    if(req.session.user != null)
        res.send('user');
    else
        res.send('guest');
});

app.use('/books', require('./controllers/book').router);
app.use('/users', require('./controllers/user').router);

app.use(function(req, res){
    res.status(404).json({message: 'page not found'});
});

database.connect(database_url, database_name, function(error) {
    if(error)
        return console.log(error);
    
    app.listen(port, function() {
       console.log('Server is running on port ' + port); 
    });
});
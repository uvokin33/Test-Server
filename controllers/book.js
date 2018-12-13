const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const router = express.Router();
const database = require('../database');

const collection = 'books';

get = function(req, res) {
    database.get().collection(collection).find().toArray(function(error, data) {
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        res.send(data);
    });
}

getTitles = function(req, res) {
    database.get().collection(collection).find().toArray(function(error, data) {
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }

        var send = [];
        for(var i = 0; i < data.length; i++)
            send.push({_id: data[i]._id, title: data[i].title});
        res.send(send);
    });
}

getByID = function(req, res){
    console.log(req.params.id);
    database.get().collection(collection).findOne({_id: ObjectID(req.params.id)}, function(error, data){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        if(data != null)
            res.send(data);
    });
}

search = function(req, res){
    const author = req.query.author;
    const publisher = req.query.publisher;
    const year = req.query.year;
    var description = req.query.description;
    
    var find = {};
    if(author != null)
        find['author'] = author;
    if(publisher != null)
        find['publisher'] = publisher;
    if(year != null)
        find['year'] = year;

    if(description == null){
        database.get().collection(collection).find(find).toArray(function(error, data ){
            if(error){
                console.log(error);
                return res.sendStatus(500);
            }
    
            var send = [];
            for(var i = 0; i < data.length; i++)
                send.push({_id: data[i]._id, title: data[i].title});
            res.send(send);
        });  
    } else{
        description = description.split(',');
        database.get().collection(collection).createIndex({ description: "text"});
        database.get().collection(collection).find({ $text: { $search: description.join()}}).toArray(function(error, data ){
            if(error){
                console.log(error);
                return res.sendStatus(500);
            }
            
            var send = [];
            for(var i = 0; i < data.length; i++)
                send.push({_id: data[i]._id, title: data[i].title});
            console.log(send);
            res.send(send);
        });
    }
}

add = function(req, res){
    database.get().collection(collection).insertOne(book_dictionary(req), function(error, result){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
}

update = function(req, res){
    var book = book_dictionary(req);
    
    database.get().collection(collection).updateOne({_id: ObjectID(req.params.id)}, {$set: book_dictionary(req)}, function(error, result){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
}

deleteBook = function(req, res){
    database.get().collection(collection).deleteOne({_id: ObjectID(req.params.id)}, function(error, result){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
}

getPages = function(req, res){
    database.get().collection(collection).find().toArray(function(error, data){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        var page = [];
        for(var i = 0; i < 3; i++){
            if(data[3 * Number(req.params.id) + i] != null)
                page.push(data[3 * Number(req.params.id) + i]);
        }
        res.send(page);
    });
}

book_dictionary = function(req){
    var book = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        author: req.body.author,
        publisher: req.body.publisher,
        year: req.body.year,
        pages: req.body.pages,
        feedback: {
            text: req.body.feedback.text,
            rating: req.body.feedback.rating
        }
    }

    if(book.title == null)
        book.title = 'unknown';
    if(book.description == null)
        book.description = 'unknown';
    if(book.image == null)
        book.image = 'default.jpg';
    if(book.author == null)
        book.author = 'unknown';
    if(book.publisher == null)
        book.publisher = 'unknown';
    if(book.year == null)
        book.year = 'unknown';
    if(book.pages == null)
        book.pages = 'unknown';

    return book;
}

router.post('/', add);
router.put('/:id', update);
router.delete('/:id', deleteBook);

router.get('/search', search);
router.get('/all', get);
router.get('/list', getTitles);
router.get('/list/page/:id', getPages);
router.get('/:id', getByID);

module.exports = router;
const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const session = require('express-session');
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
    database.get().collection(collection).findOne({_id: ObjectID(req.params.id)}, function(error, data){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }   
            
        if(req.query.page == null){
            res.send(data);
        }else{
            var page = [];
            page.push({
                title: data.title,
                description: data.description,
                author: data.author,
                publisher: data.publisher,
                year: data.year,
                pages: data.pages,
                total_rating: data.total_rating,
                feedback: []
            });
            for(var i = 0; i < 3; i++){
                if(data.feedback.text[3 * Number(req.query.page) + i] != null){
                    page[0].feedback.push({
                        user: data.feedback.text[3 * Number(req.query.page) + i].user, 
                        text: data.feedback.text[3 * Number(req.query.page) + i].text
                    });
                }
            }
            res.send(page);
        }
    });
}

feedback = function(req, res){
    if(req.session.user != null){
        database.get().collection(collection).findOne({_id: ObjectID(req.params.id)}, function(error, data){
            if(error){
                console.log(error);
                return res.sendStatus(500);
            }

            var feedback = data.feedback;
            feedback.text.push({
                user: req.session.user,
                text: req.body.text
            });

            var total_rating = 0;
            if(req.body.rating != null){
                if(data['feedback'].rating.length < 1){
                    feedback.rating.push({
                        user: req.session.user,
                        rating: req.body.rating
                    });
                }else{
                    var exists = false;

                    for(var i = 0; i < data['feedback'].rating.length; i++)
                        if(data['feedback'].rating[i].user === req.session.user){
                            exists = true;
                            break;
                        }

                    console.log(exists);

                    if(!exists){
                        for(var i = 0; i < data['feedback'].rating.length; i++){

                            if(data['feedback'].rating[i].user !== req.session.user){
                                feedback.rating.push({
                                    user: req.session.user,
                                    rating: req.body.rating
                                });                 
                            }
                        }
                    }
                }

                for(var i = 0; i < feedback['rating'].length; i++){
                    total_rating += Number(feedback['rating'][i].rating);
                }
                total_rating /= feedback['rating'].length;
            }
            
            database.get().collection(collection).updateOne({_id: ObjectID(req.params.id)}, {$set: {feedback}}, function(error, result){
                if(error){
                    console.log(error);
                    return res.sendStatus(500);
                } 
            });
            database.get().collection(collection).updateOne({_id: ObjectID(req.params.id)}, {$set: {total_rating: total_rating}}, function(error, result){
                if(error){
                    console.log(error);
                    return res.sendStatus(500);
                }
                res.status(200).json({message: 'feedback sended'});
            });
        });
    }else{
        res.status(500).json({message: 'guests can\'t send feedback'});
    }
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
        res.status(200).json({message: 'book created'});
    });
}

update = function(req, res){
    var book = book_dictionary(req);
    
    database.get().collection(collection).updateOne({_id: ObjectID(req.params.id)}, {$set: book_dictionary(req)}, function(error, result){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        res.status(200).json({message: 'book updated'});
    });
}

deleteBook = function(req, res){
    database.get().collection(collection).deleteOne({_id: ObjectID(req.params.id)}, function(error, result){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        res.status(200).json({message: 'book deleted'});
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
                page.push({_id: data[3 * Number(req.params.id) + i]._id, title: data[3 * Number(req.params.id) + i].title});
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
        total_rating: 0,
        feedback: {
            text: [], 
            rating: []
        }
    }

    return book;
}

router.post('/', add);
router.put('/:id', update);
router.delete('/:id', deleteBook);

router.get('/search', search);
router.get('/all', get);
router.get('/', getTitles);
router.get('/page/:id', getPages);
router.get('/:id', getByID);
router.post('/:id', feedback);

module.exports = {
    router,
    session
}
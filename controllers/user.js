const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const router = express.Router();
const database = require('../database');

const collection = 'users';

get = function(req, res){
    database.get().collection(collection).find().toArray(function(error, data){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        res.send(data);
    });
}

getByID = function(req, res){
    database.get().collection(collection).findOne({_id: ObjectID(req.params.id)}, function(error, data){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        res.send(data);
    });
}

register = function(req, res){
    database.get().collection(collection).insertOne(user_dictionary(req), function(error, result){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
}

authorisation = function(req, res){
    console.log(req.body.login, req.body.password);
    database.get().collection(collection).findOne({login: req.body.login, password: req.body.password}, function(error, result){
        if(error){
            console.log(error);
            res.sendStatus(500);
        }
        res.sendStatus(200)
    });
}

update = function(req, res){
    database.get().collection(collection).updateOne({_id: ObjectID(req.params.id)}, user_dictionary(req), function(error, result){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
}

deleteUser = function(req, res){
    database.get().collection(collection).deleteOne({_id: ObjectID(res.params.id)}, function(error, result){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
}

user_dictionary = function(req){
    var user = {
        login: req.body.login,
        password: req.body.password
    };
    return user;
}

router.get('/', get);
router.get('/:id', getByID);
router.post('/register', register);
router.post('/login', authorisation);
router.put('/:id', update);
router.delete('/:id', deleteUser);

module.exports = router;
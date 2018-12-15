const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const session = require('express-session');
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
    database.get().collection(collection).find({login: req.body.login}).toArray(function(error, data){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        console.log(data);
        console.log(data.length);
        if(data.length == 0){
            database.get().collection(collection).insertOne(user_dictionary(req), function(error, result){
                if(error){
                    console.log(error);
                    return res.sendStatus(500);
                }
                res.status(200).json({message: 'user created'});
            });
        }else
            res.sendStatus(500);        
    });
}

authorisation = function(req, res){
    database.get().collection(collection).find({login: req.body.login, password: req.body.password}).toArray(function(error, result){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        req.session.user = result[0]._id;
        //res.send(result);
        res.status(200).json({message: 'user authorized'});
        req.session.save(function(error){
            if(error){
                console.log(error);
                return res.sendStatus(500);
            }
        });
    });
}

update = function(req, res){
    database.get().collection(collection).updateOne({_id: ObjectID(req.params.id)}, user_dictionary(req), function(error, result){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        res.status(200).json({message: 'user updated'});
    });
}

deleteUser = function(req, res){
    database.get().collection(collection).deleteOne({_id: ObjectID(res.params.id)}, function(error, result){
        if(error){
            console.log(error);
            return res.sendStatus(500);
        }
        res.status(200).json({message: 'user deleted'});
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

module.exports = {
    router,
    session
};
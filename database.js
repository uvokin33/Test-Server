const MongoClient = require('mongodb').MongoClient;

const state = {
    database: null
};

exports.connect = function(url, collection, done) {
    if(state.database)
        return done();

    MongoClient.connect(url, {useNewUrlParser: true}, function(error, database){
        if(error)
            return done(error);
        
        state.database = database.db(collection);
        done();
    });
}

exports.get = function() {
    return state.database;   
}
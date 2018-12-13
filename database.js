const MongoClient = require('mongodb').MongoClient;

const state = {
    database: null
};

exports.connect = function(url, name, status) {
    if(state.database)
        return status();

    MongoClient.connect(url, {useNewUrlParser: true}, function(error, database){
        if(error)
            return status(error);
        
        state.database = database.db(name);
        status();
    });
}

exports.get = function() {
    return state.database;   
}
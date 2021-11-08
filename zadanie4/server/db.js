const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'zad4DB';

let db = null;

exports.getClient = async () => { 
    return new Promise((resolve, reject) => {
        if (!db)
        {
            MongoClient.connect(url, function(err, client) {
                assert.equal(null, err);
                console.log('Connected');
                db = client.db(dbName);
                resolve(db);
            })
        } else {
            resolve(db);
        }
    });  
};

exports.close = () => {
    client.close();
};





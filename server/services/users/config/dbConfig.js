const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://zakiynh:5r49qif_fyFAbtm@server-p3-c2.a9jbp.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri);

let db;
async function connection() {
    try {
        await client.connect()
        db = client.db('p3-c2-server')
    } catch (error) {
        console.log(error);
    }
}

function getDB() {
    return db
}

module.exports = { connection, getDB }

const { getClient }  = require ("../db");
const ObjectId = require('mongodb').ObjectId;

exports.getCategoriesHandler = async (req, res) => {
    const client = await getClient();
    const collection = client.collection('categories');
    const ideas = await collection.find({}).toArray();
    res.send(ideas);
}
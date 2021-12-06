const { getClient } = require("../db");
const ObjectId = require('mongodb').ObjectId;


exports.createIdeaHandler = async (req, res) => {
  const client = await getClient();
  const collection = client
    .collection('ideas');

  const result = await collection.insertOne({ ...req.body, votes: 0 }, (err, result) => {
    res.status(200).send(result.ops)
  });

  res.send(result.ops);
}
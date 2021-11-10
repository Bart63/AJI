const { getClient }  = require ("../db");

exports.getProductsHandler = async (req, res) => {
    const client = await getClient();
    const collection = client.collection('products');
    const p = await collection.find({}).toArray();
    res.send(p);
}
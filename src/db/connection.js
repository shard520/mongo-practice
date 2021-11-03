const { MongoClient } = require('mongodb');
const yargs = require('yargs');
require('dotenv').config();

const connection = async (crudFunc, dataObj) => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log('Successfully connected');
    const db = client.db('movies');
    const collection = db.collection('moviesCollection');
    await crudFunc(collection, dataObj);
    client.close();
    console.log('Client closed');
  } catch (err) {
    console.error(err);
  }
};

module.exports = connection;

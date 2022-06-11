const { MongoClient } = require('mongodb');
const util = require('util');

util.promisify(MongoClient.connect);

let dbConnection;

const connect = async () => {
  try {
    const client = await MongoClient.connect('mongodb+srv://app:33XEzwkeDiKFEuH@cluster0.kuwva.mongodb.net');
    dbConnection = client.db('SCC');
  } catch (e) {
    throw new Error(`Could not establish database connection: ${e}`);
  }
};

const mongoClient = async () => {
  if (!dbConnection) {
    await connect();
  }
  return dbConnection;
};

module.exports = {
  mongoClient,
};
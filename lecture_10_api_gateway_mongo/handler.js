'use strict';

const { mongoClient } = require('./mongo');
const axios = require('axios');

module.exports.getWeather = async (event) => {
  const db = await mongoClient();
  if (!db) res.status(500).send('Mongo DB Unavailable');

  const { data } = await axios.get('https://goweather.herokuapp.com/weather/california');
  await db.collection('weather').insertOne(data);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

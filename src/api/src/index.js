const express = require('express');
const axios = require('axios');
const { getMidpoint } = require('./utils/calculateMidpoint');

require('dotenv').config();
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const geoCodeApiBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

app = express(),
port = process.env.PORT || 8000;

// body parser
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  express.urlencoded({ extended: true });

  next();
});
app.use(express.json());

// listen on port
app.listen(port);

app.get('/api/test', (req, res) => {
  res.send('test endpoint is live');
});

app.post('/api/locations', async (req, res) => {
  const { locations } = req.body;
  const latLngs = [];

  await Promise.all(locations.map(async location => {
    const result = await axios.get(`${geoCodeApiBaseUrl}?address=${location}&key=${GEOCODE_API_KEY}`);
    const { data: { results } } = result;

    latLngs.push(results[0].geometry.location);
  }));

  const midpoint = getMidpoint(latLngs);
  res.send(`midpoint is ${JSON.stringify(midpoint)}`);
});

console.log(`API server started on: ${port}`);

const express = require('express');
const axios = require('axios');
const { getMidpoint } = require('./utils/calculateMidpoint');

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const geoCodeApiBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

app = express(),
port = process.env.PORT || 8000;

// body parser
app.use(
  express.urlencoded({
    extended: true
  })
);
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

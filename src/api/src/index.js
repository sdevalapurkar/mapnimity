const express = require('express');
const axios = require('axios');
const { getMidpoint } = require('./utils/calculateMidpoint');

require('dotenv').config();
const API_KEY = process.env.API_KEY;
const geoCodeApiBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
const placesApiBaseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

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

app.get('/api/test', async (req, res) => {
  res.send('test endpoint is live');
});

app.post('/api/latlng', async (req, res) => {
  const { locations } = req.body;  
  const latLngs = await getLatLngsForAddresses(locations);

  res.send(latLngs);
});

app.post('/api/locations', async (req, res) => {
  const { locations } = req.body;
  const latLngs = await getLatLngsForAddresses(locations);
  const midpoint = getMidpoint(latLngs);
  let radius = 0;
  let restaurantData = [];

  while (restaurantData.length < 15) {
    const restaurants = await axios.get(`${placesApiBaseUrl}?location=${midpoint.latitude},${midpoint.longitude}&radius=${radius}&type=restaurant&key=${API_KEY}`);

    restaurantData = restaurants.data.results.slice();
    radius += 200;
  }
  
  res.send(restaurantData.slice(0,15));
});

console.log(`API server started on: ${port}`);

const getLatLngsForAddresses = async (locations) => {
  const latLngs = [];

  await Promise.all(locations.map(async location => {
    const loc = location.description ? location.description : location;
    const result = await axios.get(`${geoCodeApiBaseUrl}?address=${loc}&key=${API_KEY}`);
    const { data: { results } } = result;

    latLngs.push(results[0].geometry.location);
  }));

  return latLngs;
};

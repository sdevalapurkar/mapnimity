const { getCenter } = require('geolib');

function getMidpoint(locations) {
  return getCenter(locations);
}

module.exports = { getMidpoint };

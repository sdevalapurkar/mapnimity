import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

export default function MapContain() {
  const position = [1.35, 103.0];

  return (
    <Map zoom={10} center={position} className="map" style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  );
}

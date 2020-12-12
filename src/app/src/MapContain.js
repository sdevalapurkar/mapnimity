import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default function MapContain(props) {
  const { locations } = props;
  const [position, setPosition] = useState([1.3, 103.5]);
  const properLocations = locations[0];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(location => {
      setPosition([location.coords.latitude, location.coords.longitude]);
    })
  }, []);

  return (
    <>
      {position && locations.length === 0 && (
        <Map zoom={15} center={position} className="map" style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      )}
      {locations.length > 0 && (
        <Map zoom={14} center={properLocations[0].position} className="map" style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {properLocations.map(l => (
            <Marker position={l.position}>
              <Popup>
                {l.name}
                <br />
                {l.isOpen && (
                  `Currently Open`
                )}
                {!l.isOpen && (
                  `Currently Closed`
                )}
              </Popup>
            </Marker>
          ))}
        </Map>
      )}
    </>
  );
}

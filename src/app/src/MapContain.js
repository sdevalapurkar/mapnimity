import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker as Mark, Popup } from 'react-leaflet';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import Marker from 'react-leaflet-enhanced-marker';

export default function MapContain(props) {
  const { locations, myAddresses } = props;
  const [position, setPosition] = useState([1.3, 103.5]);
  const properLocations = locations[0];
  const properMyAddresses = myAddresses[0];

  useEffect(async () => {
    navigator.geolocation.getCurrentPosition(location => {
      setPosition([location.coords.latitude, location.coords.longitude]);
    });
  }, []);

  return (
    <>
      {position && locations.length === 0 && (
        <Map zoom={15} center={position} className="map" style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Mark position={position} />
        </Map>
      )}
      {locations.length > 0 && (
        <Map zoom={14} center={properLocations[0].position} className="map" style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {properLocations.map(l => (
            <Mark position={l.position}>
              <Popup>
                <b>{l.name}</b>
                <br />
                {l.vicinity}
                <br />
                {l.isOpen && (
                  `Currently Open`
                )}
                {!l.isOpen && (
                  `Currently Closed`
                )}
                <br />
                {`Rating: ${l.rating}`}
                <br />
                {l.priceLevel && (
                  `Price Level: ${l.priceLevel}`
                )}
              </Popup>
            </Mark>
          ))}
          {properMyAddresses && properMyAddresses.length > 0 && (
            <>
              {properMyAddresses.map(ma => (
                <Marker icon={<PersonPinCircleIcon fontSize="large" />} position={ma} />
              ))}
            </>
          )}
        </Map>
      )}
    </>
  );
}

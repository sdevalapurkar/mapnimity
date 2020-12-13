import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, TextField, Grid } from '@material-ui/core';
import PlacesInput from './PlacesInput';
import MapContain from './MapContain';
import './css/MainHome.css'
import MenuAppBar from './MenuAppBar';

require('dotenv').config();

function MainHome() {
  const [address, setAddress] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [locations, setLocations] = useState([]);
  const [myAddresses, setMyAddresses] = useState([]);

  const storeLocations = (locationData) => {
    const locationFormattedData = [];

    locationData.forEach(l => {
      const objectData = {};

      objectData.position = [l.geometry.location.lat, l.geometry.location.lng];
      objectData.name = l.name;
      objectData.isOpen = l.opening_hours.open_now;
      objectData.priceLevel = l.price_level;
      objectData.rating = l.rating;
      objectData.vicinity = l.vicinity;

      locationFormattedData.push(objectData);
    });

    setLocations([ ...locations, locationFormattedData ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!address || addressList.some(addressList => addressList.description === address.description)) {
      return;
    }

    let newState = [...addressList, address];
    setAddressList(newState);
  }

  const handleAddressLookup = async (event) => {
    event.preventDefault();

    const fetchURL = `${process.env.REACT_APP_PORT}/api/locations`;

    try {
      const response = await axios.post(fetchURL, { "locations": addressList });

      if (response.status === 200) {
        storeLocations(response.data);
      }

      const latLngs = await axios.post(`${process.env.REACT_APP_PORT}/api/latlng`, { "locations": addressList });
      const finalLatLngs = [];

      latLngs.data.forEach(a => {
        finalLatLngs.push([a.lat, a.lng]);
      });

      setMyAddresses([ ...myAddresses, finalLatLngs ]);
    } catch (err) {
      alert('Error submitting addresses');
    }
  };

  const handleDelete = (addy) => {
    const currAddList = addressList;

    setAddressList(currAddList.filter(item => item.description !== addy.description));
  };

  return (
    <div className="maxheight">
      <MenuAppBar />
      <div className="formcontainer-div">
        <div className="sixtywidth">
          <MapContain myAddresses={myAddresses} locations={locations} />
        </div>
        <div style={{ marginLeft: "20px" }}>
          <div className="space-top centeralign">
            <h2>Add an Address</h2>
          </div>
          <br/>
          <Grid container>
            <FormControl>
              <div className="formcontainer-div space-bottom">
                <PlacesInput setAddress={setAddress} />
                <button
                  disabled={!address}
                  className="btn btn-primary btn-lg space-left"
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                >+</button>
              </div>
              <div>
                {addressList.map((addy) => (
                  <div key={addy.description} className="displayflex">
                    <TextField
                      style={{ width: 500 }}
                      value={addy.description}
                      variant="outlined"
                      disabled
                    />
                    <button
                      className="btn btn-danger btn-lg space-left"
                      type="button"
                      onClick={() => handleDelete(addy)}
                    >x</button>
                  </div>
                ))}
              </div>
              <div className="full-width">
                <button
                  disabled={(addressList.length <= 1)}
                  onClick={(event) => handleAddressLookup(event)}
                  className="btn btn-primary btn-lg space-top full-width"
                >
                  Let's Meet!
                </button>
              </div>
            </FormControl>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default MainHome;
